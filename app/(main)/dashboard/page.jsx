import CreareAccountDrawer from "@/components/create-account-drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";
import { getUserAccounts } from "@/actions/dashboard";
import AccountCard from "./_components/account-card";
import { getCurrentBudget } from "@/actions/budget";
import { BudgetProgress } from "./_components/budget-progress";

async function DashboardPage() {
  // const accounts = await getUserAccounts();
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    // getDashboardData(),
  ]);

  const defaultAccount = accounts?.find((account) => account.isDefault);
  // console.log("defaultAccount", defaultAccount);

  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
    console.log(budgetData);
  }

  return (
    <div className="space-y-6">
      {/* budget progress */}
      {defaultAccount && (
        <BudgetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />
      )}

      {/* overview */}

      {/* accounts */}
      <div className="grid gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-3">
        <CreareAccountDrawer>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-dashed">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
              <Plus className="h-10 w-10 mb-2" />
              <p className="text-sm font-medium">Add new account</p>
            </CardContent>
          </Card>
        </CreareAccountDrawer>

        {accounts.length > 0 &&
          accounts.map((account) => {
            return <AccountCard key={account.id} account={account} />;
          })}
      </div>
    </div>
  );
}

export default DashboardPage;
