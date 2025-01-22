"use client"
import React, { useEffect } from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger} from "@/components/ui/drawer";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { accountSchema } from "@/app/lib/schema";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import useFetch from "@/hooks/fetch";
import { createAccount } from "@/actions/dashboard";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const CreareAccountDrawer = ({ children }) => {
    
    const {data: newAccount, error, fn: createAccountFn, loading: createAccountLoading} = useFetch(createAccount);

    useEffect(()=>{

      console.log('useEffect', newAccount);
      if(newAccount && !createAccountLoading){
        toast.success('Account Created Successfully');
        reset();
        setOpen(false);
      }

    },[createAccountLoading, newAccount])

    useEffect(()=>{
      if(error){
        toast.error(error.message || "failed to create a new account")
      }
    },[error])

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
      createAccountFn(data)
    } 

    // console.log(open);
/*
    What Happens If You Remove prop={open} onOpenChange={setOpen}?
    The Drawer component would then use its internal state for managing the open/close behavior instead of being externally controlled.
    This means you won't have direct control of the open state from your component (e.g., via useState).
    For example:
    
    Without prop={open}, the drawer would still open and close, but the external open state in your component would not reflect or control this behavior.
    Without onOpenChange={setOpen}, closing the drawer via interactions (like clicking outside) wouldn't update the external open state.
*/    

/*
     Quest) Why Use prop={open} onOpenChange={setOpen}?
     ==> Using these props makes the Drawer controlled, meaning its state is fully managed by the useState in your component. This is beneficial because:

     1) Consistency: The open/close state is stored in one place (open state) and can be used elsewhere in the app if needed.
     2) Customization: You can programmatically open or close the drawer based on custom logic (e.g., after a form submission).
     3) Sync with State: The drawer's visibility is always in sync with your application's state.
*/

/*
   Here prop={open} is being passed to the drawer component, supposed it accept here as a prop.
    -> prop={open} binds the state of the drawer (which is true or false) to the component.
    --> The Drawer accepts this prop to control its visibility, ensuring it opens when open is true and closes when open is false.
*/

/* 
  1) Example: Without asChild

   <DrawerTrigger>
    <button className="custom-trigger">Open Drawer</button>
  </DrawerTrigger>

1.1) The result might render as:

  <button class="drawer-trigger">
    <button class="custom-trigger">Open Drawer</button>
  </button>


2)  Example: With asChild
    <DrawerTrigger asChild>
      <button className="custom-trigger">Open Drawer</button>
    </DrawerTrigger>

2.1) The result might render as:
  <button class="custom-trigger">Open Drawer</button>


  quest) When Should You Use asChild?
   ==> You should use asChild when:

    1)You want to avoid unnecessary wrapping elements for cleaner DOM structure.
    2)You want to fully control the styling and behavior of the child element without interference 
       from the DrawerTrigger or DrawerClose components' default styles or structure.
    3)You’re passing a complex or custom component (e.g., Button) and want it to seamlessly integrate without additional wrappers.
*/
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
                  <Input id='name' placeholder="eg. Main Checking"  {...register('name')} />
                  {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}                          
              </div>
   
          {/* Account type */}
            <div className="space-y-2">
                  <label htmlFor="type" className="text-sm font-medium"> Account Type </label>
                {/* defaultValue={watch('type') is used to retrive the current value of the type */}
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
                   {/* what is step  ==> step="0.01", means to deal with two input places */}
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
                //  checked={watch('isDefault')} is used to make the switch in sycn with the form state
                   checked={watch('isDefault')}
                />
              {errors.isDefault && <p className="text-sm text-red-500">{errors.isDefault.message}</p>}                          
          </div>  

      {/* button for cenceling and creating an account */}
      <div className="p-3 grid-cols-2 space-x-3 flex items-center justify-center">

        <DrawerClose asChild>
          <Button type='button' variant="outline" className='flex-1'>Cancel</Button>
        </DrawerClose>

        <Button className='flex-1' type='submit' disabled={createAccountLoading}>{createAccountLoading? <><Loader2 className="animate-spin h-4 w-4 mr-2"/>Creating...</>: 'create Account'}</Button>
        {/* <Button className='flex-1' type='submit'>Create Account</Button> */}
      </div>
    </form>
 </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreareAccountDrawer;


/*
Key Points:
 1) --> register('name'): Registers the field with the form state.
 2) {...register('name')}: Spreads the necessary props (onChange, onBlur, value, etc.) 
     into the input element to manage the form state seamlessly. 
*/