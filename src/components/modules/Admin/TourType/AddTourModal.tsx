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
import { useAddTourTypeMutation } from '@/redux/features/Tour/tour.api';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function AddTourTypeModal() {
  const [onOpen, setOnOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      name: '',
    },
  });
  const [addTourType] = useAddTourTypeMutation();

  const onSubmit = async (data) => {
    try {
      const res = await addTourType(data).unwrap();
      toast.success(res.message || 'Tour Type added successfully');
      setOnOpen(false);
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error(error.data.message || 'Failed to add Tour Type');
    }
  };

  return (
    <Dialog open={onOpen} onOpenChange={setOnOpen}>
      <form>
        <DialogTrigger asChild>
          <Button>Add Tour Type</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Add Tour Type</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form id='add-tour-type' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tour Type Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Tour Type Name' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
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
            <Button form='add-tour-type' type='submit'>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
