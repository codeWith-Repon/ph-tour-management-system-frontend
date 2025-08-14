import { Button } from '@/components/ui/button';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useGetDivisionQuery } from '@/redux/features/division/division.api';
import { useGetTourTypesQuery } from '@/redux/features/Tour/tour.api';
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';

export default function AddTour() {
  const { data: tourTypeData, isLoading: tourTypeLoading } =
    useGetTourTypesQuery(undefined);
  const { data: divisionData, isLoading: divisionLoading } =
    useGetDivisionQuery(undefined);

  const divisionOptions = divisionData?.data?.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })
  );

  const tourTypeOptions = tourTypeData?.data?.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })
  );

  const form = useForm({
    defaultValues: {
      title: '',
      division: '',
      tourType: '',
      description: '',
      location: '',
      costFrom: '',
    },
  });

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className='w-full max-w-4xl mx-auto px-5 mt-16'>
      <Card>
        <CardHeader>
          <CardTitle>Add New Tour</CardTitle>
          <CardDescription>Add a new tour to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id='add-tour-form'
              className='space-y-5'
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tour Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex gap-5'>
                <FormField
                  control={form.control}
                  name='location'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='costFrom'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Cost</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='flex gap-5'>
                <FormField
                  control={form.control}
                  name='division'
                  render={({ field }) => (
                    <FormItem className='flex-1 '>
                      <FormLabel>Division</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {divisionLoading ? (
                            <SelectItem value='loading' disabled>
                              Loading...
                            </SelectItem>
                          ) : (
                            divisionOptions?.map(
                              (item: { value: string; label: string }) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              )
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='tourType'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Tour Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tourTypeLoading ? (
                            <SelectItem value='loading' disabled>
                              Loading...
                            </SelectItem>
                          ) : (
                            tourTypeOptions?.map(
                              (item: { value: string; label: string }) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              )
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='flex gap-5 items-stretch'>
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} className='h-[205px] ' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='flex justify-end'>
          <Button type='submit' form='add-tour-form'>
            Create Tour
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
