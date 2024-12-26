"use client"
import React from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger} from "@/components/ui/drawer";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { accountSchema } from "@/app/lib/schema";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";


const CreareAccountDrawer = ({ children }) => {
    console.log(children);

    const [open, setOpen] = useState(false);

    const {register, handleSubmit, formState:{errors}, setValue, watch, reset} = useForm({
      resolver: zodResolver(accountSchema),
      defaultValues: {
        name: "",
        type: "CURRENT",
        balance: "",
        isDefault: false
      }
    })

    const onSubmit = async (data)=>{
      console.log(data);
    } 

  return (
    <Drawer prop={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{ children }</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Account</DrawerTitle>
        </DrawerHeader>

        {/* Account name */}
          <div className="px-4 pb-4">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium"> Account Name </label>
                  {/* {...register('name')} what connection it is doing here in the input field */}
                  <Input id='name' placeholder="eg. Main Checking"  {...register('name')}/>
                  {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}                          
              </div>
   
          {/* Account type */}
            <div className="space-y-2">
                  <label htmlFor="type" className="text-sm font-medium"> Account Type </label>
                {/* why we wrote onValueChange and how it works, what is defaultValue, why id='type' wrote */}
                  <Select onValueChange={(value)=> setValue("type", value)}
                    defaultValue={watch('type')}
                    >
                   <SelectTrigger id='type'>
                    <SelectValue placeholder="Select Account Type" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="CURRENT">Current</SelectItem>
                     <SelectItem value="SAVING">Saving</SelectItem>
                  </SelectContent>
                 </Select>

                  {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}                          
             </div>

               {/* balance  */}          
                <div className="space-y-2">
                  <label htmlFor="balance" className="text-sm font-medium">Initial Balance </label>
                   {/* what is step */} 
                  <Input id='balance' type='number' step='0.01' placeholder="0.00"  {...register('balance')}/>
                  {errors.balance && <p className="text-sm text-red-500">{errors.balance.message}</p>}                          
                </div>

        {/* switch  */}
          <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <label htmlFor="isDefault" className="text-sm font-medium cursor-pointer">Set As Default</label>
                <p className="text-sm text-muted-foreground">This account will be selected by default for transaction</p>
              </div>
                <Switch id='isDefault' onCheckedChange={(checked)=> setValue('isDefault', checked)}
                   checked={watch('isDefault')}
                />
              {errors.isDefault && <p className="text-sm text-red-500">{errors.isDefault.message}</p>}                          
          </div>  

      {/* button for cenceling and creating an account */}

      {/* why type button and why type submit different and why flex-1 in both btn */}
      <div className="p-3 grid-cols-2 space-x-3 flex items-center justify-center">

        <DrawerClose asChild>
          <Button type='button' variant="outline" className='flex-1'>Cancel</Button>
        </DrawerClose>

        <Button className='flex-1' type='submit'>Create an Account</Button>
      </div>
    </form>
 </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreareAccountDrawer;
