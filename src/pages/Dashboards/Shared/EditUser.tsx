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

const EditUser = () => {
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
          <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="sheet-demo-username">Email</Label>
          <Input disabled id="sheet-demo-username" defaultValue="ayon55928@gmail.com" />
        </div>
      </div>
      <SheetFooter>
        <Button type="submit">Save changes</Button>
        <SheetClose asChild>
          <Button variant="outline">Close</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
};

export default EditUser;
