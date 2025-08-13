/* eslint-disable @typescript-eslint/no-explicit-any */
import SingleImageUploader from '@/components/SingleImageUploader';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAddDivisionMutation } from '@/redux/features/division/division.api';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type DivisionFormValues = {
  name: string;
  description: string;
};

export function AddDivisionModal() {
  const [onOpen, setOnOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [addDivision] = useAddDivisionMutation();

  const form = useForm<DivisionFormValues>({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = async (data: DivisionFormValues) => {
    const id = toast.loading('Adding Division...');
    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      formData.append('file', image as File);

      const res = await addDivision(formData).unwrap();
      console.log(res);
      toast.success('Division Added Successfully', { id });
      setOnOpen(false);
      //   console.log(formData.get('data'));
      //   console.log(formData.get('file'));
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to add Division', { id });

      console.log(error);
    }
  };

  console.log('inside modal', image);

  return (
    <Dialog open={onOpen} onOpenChange={setOnOpen}>
      <DialogTrigger asChild>
        <Button>Add Division</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add Division</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className='space-y-5'
            id='add-division'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter Name' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Enter Description' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
          <SingleImageUploader onChange={setImage} />
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant='outline'
              onClick={() => {
                form.reset();
              }}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={!image} form='add-division' type='submit'>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
