"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import React from "react";

const TransactionTable = ({ transaction }) => {

  const filteredAndSortedTransaction = transaction;
  console.log('filteredAndSortedTransaction' ,filteredAndSortedTransaction);

  const handleSort = () => {};

  return (
    <div className="space-y-4">
      {/* Filters  */}

      {/* Table  */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("date")}
              >
               <div className="flex items-center border">Date</div>
              </TableHead>
              <TableHead>Discription</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("category")}
              >
               <div className="flex items-center border">Category</div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center border justify-end">Amount</div>
              </TableHead>
              <TableHead className="">Recurring</TableHead>
              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            { filteredAndSortedTransaction?.length === 0 ? <TableRow>
              <TableCell colSpan={7} className='text-center text-muted-foreground'>No Transaction Found</TableCell>
            </TableRow>:(
              filteredAndSortedTransaction?.map((transaction)=>(
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    <Checkbox />
                  </TableCell>
                  <TableCell>{ format(new Date(transaction.date), 'pp') }</TableCell>
                  <TableCell>{transaction?.description}</TableCell>
                  <TableCell className="">{transaction?.category}</TableCell>
                  <TableCell className="text-right">{transaction.amount}</TableCell>
                  <TableCell className="">{ transaction.recurring}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionTable;
