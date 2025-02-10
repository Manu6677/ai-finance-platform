"use client"

import React, { useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { updateDefaultAccount } from "@/actions/account";
import Link from "next/link";
import useFetch from "@/hooks/fetch";
import { toast } from "sonner";

const AccountCard = ({ account }) => {
  const { id, name, type, balance, isDefault } = account;
  const { loading: updateDefaultLoading, fn: updateDefaultFn, data: updatedAccount, error } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async(event)=>{
    event.preventDefault();
    
    if(isDefault){
      toast.warning("You need atleast one default account");
      return;
    }
    await updateDefaultFn(id);
  }

  useEffect(()=>{
    if(updatedAccount?.success){
      toast.success("Deafult account updated successfully");
    }
  }, [updatedAccount, updateDefaultLoading])

  useEffect(()=>{
    if(error){
      toast.error(error.message || "Failed to update default account");
    }
  },[error])

  return (
    <div>
      <Card className="hover:shadow-md transition-shadow group relative">
        <Link href={`/account/${id}`}>
        <CardHeader className="flex justify-between flex-row items-center space-y-0 pb-2">
          <CardTitle className="font-medium text-sm capitalize">{ name }</CardTitle>
          <Switch checked={isDefault} onClick={handleDefaultChange} disabled={updateDefaultLoading}/>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${ balance? parseFloat(balance).toFixed(2): '00'} 
          </div>
          <p className="text-xs text-muted-foreground">
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
          </p>
        </CardContent>
        <CardFooter className="flex justify-between text-sm">
          <div className="flex items-center">
            <ArrowUpRight className="mr-1 h-6 w-4 text-green-500"/>
             Income
          </div>

          <div className="flex items-center">
            <ArrowDownRight className="mr-1 h-6 w-4 text-red-500" />
             Expense
          </div>
        </CardFooter>
        </Link>
      </Card>
    </div>
  );
};

export default AccountCard;
