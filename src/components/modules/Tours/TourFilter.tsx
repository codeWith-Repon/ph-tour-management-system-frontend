import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetDivisionQuery } from '@/redux/features/division/division.api';
import { useGetTourTypesQuery } from '@/redux/features/Tour/tour.api';
import { useState } from 'react';

const TourFilter = () => {
  const [selectedDivision, setSelectedDivision] = useState<string | undefined>(
    undefined
  );
  const [selectedTourType, setSelectedTourType] = useState<string | undefined>(
    undefined
  );

  const { data: divisionData, isLoading: divisionLoading } =
    useGetDivisionQuery(undefined);

  const { data: tourTypeData, isLoading: tourTypeLoading } =
    useGetTourTypesQuery(undefined);

  const divisionOptions = divisionData?.data.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item._id,
    })
  );

  const tourTypeOptions = tourTypeData?.data?.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item._id,
    })
  );

  const handleClearFilter = () => {
    setSelectedDivision(undefined);
    setSelectedTourType(undefined);
  };

  return (
    <div className='col-span-3 w-full h-[500px] border border-muted rounded-md p-5 space-y-4'>
      <div className='flex items-center justify-between'>
        <h1>Filters</h1>
        <Button size='sm' variant='outline' onClick={handleClearFilter}>
          Clear Filters
        </Button>
      </div>
      <div>
        <Label className='mb-2'>Division to visit</Label>
        <Select
          onValueChange={(value) => setSelectedDivision(value)}
          value={selectedDivision}
        >
          <SelectTrigger className='w-full'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Division</SelectLabel>
              {divisionLoading ? (
                <SelectItem value='loading' disabled>
                  Loading...
                </SelectItem>
              ) : (
                divisionOptions?.map(
                  (item: { label: string; value: string }) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  )
                )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className='mb-2'>Tour Type</Label>
        <Select onValueChange={(value) => setSelectedTourType(value)}>
          <SelectTrigger className='w-full'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tour Type</SelectLabel>
              {tourTypeLoading ? (
                <SelectItem value='loading' disabled>
                  Loading...
                </SelectItem>
              ) : (
                tourTypeOptions?.map(
                  (item: { label: string; value: string }) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  )
                )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TourFilter;
