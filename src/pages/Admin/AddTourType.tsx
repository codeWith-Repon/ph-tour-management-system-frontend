import {
  useGetTourTypesQuery,
  useRemoveTourTypeMutation,
} from '@/redux/features/Tour/tour.api';
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
import { DeleteConfirmation } from '@/components/DeleteConfirmation';
import { toast } from 'sonner';

const AddTourType = () => {
  const { data } = useGetTourTypesQuery(undefined);
  const [removeTourType] = useRemoveTourTypeMutation();

  const handleRemoveTourType = async (torTypeId: string) => {
    const toastId = toast.loading('Removing.....');
    try {
      const res = await removeTourType(torTypeId);

      if (res.data.success) {
        toast.success(res.data.message, { id: toastId });
      }
    } catch (error) {
      toast.error('Failed to remove tour type', { id: toastId });
    }
  };

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
            {data?.data?.map((item: { _id: string; name: string }) => (
              <TableRow key={item._id}>
                <TableCell className='font-medium w-full'>
                  {item.name}
                </TableCell>
                <TableCell className='font-medium'>
                  <DeleteConfirmation
                    onConfirm={() => handleRemoveTourType(item._id)}
                  >
                    <Button size='sm'>
                      <Trash2 />
                    </Button>
                  </DeleteConfirmation>
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
