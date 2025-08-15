import MultipleImageUploader from '@/components/MultipleImageUploader';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { FileMetadata } from '@/hooks/use-file-upload';
import { cn } from '@/lib/utils';
import { useGetDivisionQuery } from '@/redux/features/division/division.api';
import {
  useAddTourMutation,
  useGetTourTypesQuery,
} from '@/redux/features/Tour/tour.api';
import { format, formatISO } from 'date-fns';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
  useFieldArray,
  useForm,
  type FieldValues,
  type SubmitHandler,
} from 'react-hook-form';

export default function AddTour() {
  const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);
  console.log(images);

  const { data: tourTypeData, isLoading: tourTypeLoading } =
    useGetTourTypesQuery(undefined);
  const { data: divisionData, isLoading: divisionLoading } =
    useGetDivisionQuery(undefined);
  const [AddTour] = useAddTourMutation();

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
      startDate: '',
      endDate: '',
      included: [{ value: '' }],
      excluded: [{ value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'included',
  });

  const {
    fields: excludedFields,
    append: excludedAppend,
    remove: excludedRemove,
  } = useFieldArray({
    control: form.control,
    name: 'excluded',
  });
  console.log(fields);
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const tourData = {
      ...data,
      startDate: formatISO(data.startDate),
      endDate: formatISO(data.endDate),
      included: data.included.map((item: { value: string }) => item.value),
      excluded: data.excluded.map((item: { value: string }) => item.value),
    };

    console.log(tourData);

    const formData = new FormData();

    formData.append('data', JSON.stringify(tourData));
    images.forEach((image) => formData.append('files', image as File));

    // try {
    //   const res = await AddTour(formData).unwrap();
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }
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

              <div className='flex gap-5'>
                <FormField
                  control={form.control}
                  name='startDate'
                  render={({ field }) => (
                    <FormItem className='flex flex-col flex-1'>
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={new Date(field.value)}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date <
                              new Date(
                                new Date().setDate(new Date().getDate() - 1)
                              )
                            }
                            captionLayout='dropdown'
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='endDate'
                  render={({ field }) => (
                    <FormItem className='flex flex-col flex-1'>
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={new Date(field.value)}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date <
                              new Date(
                                new Date().setDate(new Date().getDate() - 1)
                              )
                            }
                            captionLayout='dropdown'
                          />
                        </PopoverContent>
                      </Popover>
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
                <div className='flex-1 mt-5'>
                  <MultipleImageUploader onChange={setImages} />
                </div>
              </div>
              <div className='border-t border-muted w-full'></div>
              <div>
                <div className='flex items-center justify-between'>
                  <p className='font-semibold'>Included</p>
                  <Button
                    type='button'
                    size='icon'
                    variant='outline'
                    onClick={() => append({ value: '' })}
                  >
                    <Plus />
                  </Button>
                </div>

                <div className='space-y-4 mt-4'>
                  {fields.map((item, index) => (
                    <div className=' flex gap-2' key={item.id}>
                      <FormField
                        control={form.control}
                        name={`included.${index}.value`}
                        render={({ field }) => (
                          <FormItem className='flex-1'>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        onClick={() => remove(index)}
                        variant='destructive'
                        size='icon'
                        type='button'
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className='flex items-center justify-between'>
                  <p className='font-semibold'>Excluded</p>
                  <Button
                    type='button'
                    size='icon'
                    variant='outline'
                    onClick={() => excludedAppend({ value: '' })}
                  >
                    <Plus />
                  </Button>
                </div>

                <div className='space-y-4 mt-4'>
                  {excludedFields.map((item, index) => (
                    <div className=' flex gap-2' key={item.id}>
                      <FormField
                        control={form.control}
                        name={`excluded.${index}.value`}
                        render={({ field }) => (
                          <FormItem className='flex-1'>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        onClick={() => excludedRemove(index)}
                        variant='destructive'
                        size='icon'
                        type='button'
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                </div>
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
