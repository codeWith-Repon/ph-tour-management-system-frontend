import { useGetTourTypesQuery } from '@/redux/features/Tour/tour.api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { AddTourTypeModal } from '@/components/modules/Admin/TourType/AddTourModal';

const AddTourType = () => {
  const { data } = useGetTourTypesQuery(undefined);

  // console.log(data);
  return (
    <div className='w-full max-w-7xl mx-auto px-5'>
      <div className='flex justify-between my-8'>
        <h1 className='text-2xl font-bold'>Tour Types</h1>
        <AddTourTypeModal />
      </div>
      <div className='border border-muted rounded-md p-2'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Name</TableHead>
              <TableHead className='text-right'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((item: { name: string }) => (
              <TableRow key={item.name}>
                <TableCell className='font-medium w-full'>
                  {item.name}
                </TableCell>
                <TableCell className='font-medium'>
                  <Button size='sm'>
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AddTourType;
