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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { AddTourTypeModal } from '@/components/modules/Admin/TourType/AddTourModal';
import { DeleteConfirmation } from '@/components/DeleteConfirmation';
import { toast } from 'sonner';
import { useState } from 'react';
import { getPaginationRange } from '@/utils/getPagination';

const AddTourType = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetTourTypesQuery({ page: currentPage });
  const [removeTourType] = useRemoveTourTypeMutation();
  const totalPage = data?.meta?.totalPage || 1;
  console.log(data);

  const handleRemoveTourType = async (torTypeId: string) => {
    const toastId = toast.loading('Removing.....');
    try {
      const res = await removeTourType(torTypeId);

      if (res.data.success) {
        toast.success(res.data.message, { id: toastId });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

      <div className='flex justify-end mt-4'>
        <div>
          {totalPage > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className={
                      currentPage === 1
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer'
                    }
                  />
                </PaginationItem>

                {getPaginationRange(totalPage, currentPage).map(
                  (page, index) => (
                    <PaginationItem key={index}>
                      {page === '...' ? (
                        <span className='px-2'>...</span>
                      ) : (
                        <PaginationLink
                          className='cursor-pointer'
                          onClick={() => setCurrentPage(page as number)}
                          isActive={page === currentPage}
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className={
                      currentPage === totalPage
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer'
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default AddTourType;
