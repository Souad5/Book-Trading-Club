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
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/firebase/AuthProvider';
import { useState } from 'react';
import { toast } from 'react-toastify';

const EditUser = ({ setOpen }) => {
  const { dbUser } = useAuth();
  const axiosSecure = UseAxiosSecure();
  const [name, setname] = useState(dbUser?.displayName || '');
  const [image, setImage] = useState(dbUser?.image || '');
  const [updating, setUpdating] = useState(false);

  const HandleUpdate = async () => {
    console.log(name);
    const body = {
      displayName: name,
      image: image,
    };
    setUpdating(true);
    try {
      const response = await axiosSecure.put(`/api/users/${dbUser?.uid}`, body);
      console.log(response);
      toast.success('User info Updated Successfully');
      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(false);
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
          <Label htmlFor="sheet-demo-name">Image URL</Label>
          <Input
            id="sheet-demo-name"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
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
        {!updating && (
          <Button type="submit" onClick={HandleUpdate}>
            Save changes
          </Button>
        )}
        {updating && (
          <Button type="submit" disabled onClick={HandleUpdate}>
            <Spinner /> Updating
          </Button>
        )}
        <SheetClose asChild>
          <Button variant="outline">Close</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
};

export default EditUser;
