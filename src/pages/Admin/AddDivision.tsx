/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteConfirmation } from '@/components/DeleteConfirmation';
import { AddDivisionModal } from '@/components/modules/Admin/Division/AddDivisionModal';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  useGetDivisionQuery,
  useRemoveDivisionMutation,
} from '@/redux/features/division/division.api';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const AddDivision = () => {
  const { data } = useGetDivisionQuery(undefined);
  const [removeDivision] = useRemoveDivisionMutation();

  const handleRemoveDivision = async (divisionId: string) => {
    const id = toast.loading('Removing Division...');
    try {
      const res = await removeDivision(divisionId).unwrap();
      toast.success(res.message || 'Division removed successfully', { id });
    } catch (error: any) {
      toast.error(error.message || 'Failed to remove division', { id });
    }
  };

  console.log(data);
  return (
    <div className='w-full max-w-7xl mx-auto'>
      <div className='flex justify-between my-8'>
        <h1 className='text-2xl font-bold'>Division Management</h1>
        <AddDivisionModal />
      </div>

      <div className='border border-muted rounded-md p-2'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[250px]'>Name</TableHead>
              <TableHead className='text-left'>Description</TableHead>
              <TableHead className='text-left'>Image</TableHead>
              <TableHead className='text-right'>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.data?.map(
              (division: {
                _id: string;
                name: string;
                description: string;
                thumbnail: string;
              }) => (
                <TableRow key={division._id}>
                  <TableCell className='font-medium'>{division.name}</TableCell>
                  <TableCell>{division.description}</TableCell>
                  <TableCell className='h-16'>
                    <img
                      src={division.thumbnail}
                      alt={division.name}
                      className='rounded-md h-full w-auto object-cover'
                    />
                  </TableCell>
                  <TableCell className='text-right'>
                    <DeleteConfirmation
                      onConfirm={() => handleRemoveDivision(division._id)}
                    >
                      <Button size={'sm'}>
                        <Trash2 />
                      </Button>
                    </DeleteConfirmation>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AddDivision;
