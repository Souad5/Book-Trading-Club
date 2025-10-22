import UseAxiosSecure from '@/axios/UseAxiosSecure';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useAuth } from '@/firebase/AuthProvider';
import { useState } from 'react';
import { toast } from 'react-toastify';

const EditUser = () => {
  const { dbUser } = useAuth();
  const axiosSecure = UseAxiosSecure();
  const [name, setname] = useState(dbUser?.displayName || '');
  const HandleUpdate = async () => {
    console.log(name);
    const body = {
      displayName: name,
    };
    try {
      const response = await axiosSecure.put(`/api/users/${dbUser?.uid}`, body);
      console.log(response);
      toast.success('User info Updated Successfully');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>
          Make changes to your profile here. Click save when you&apos;re done.
        </SheetDescription>
      </SheetHeader>
      <div className="grid flex-1 auto-rows-min gap-6  my-5">
        <div className="grid gap-3">
          <Label htmlFor="sheet-demo-name">Name</Label>
          <Input
            id="sheet-demo-name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="sheet-demo-username">Email</Label>
          <Input
            disabled
            id="sheet-demo-username"
            defaultValue={dbUser?.email || ''}
          />
        </div>
      </div>
      <SheetFooter>
        <Button type="submit" onClick={HandleUpdate}>
          Save changes
        </Button>
        <SheetClose asChild>
          <Button variant="outline">Close</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
};

export default EditUser;
