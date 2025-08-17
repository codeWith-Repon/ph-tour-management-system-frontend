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
import { useSearchParams } from 'react-router';

const TourFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedDivision = searchParams.get('division') || undefined;
  const selectedTourType = searchParams.get('tourType') || undefined;

  console.log(selectedDivision, 'Y', selectedTourType);

  const { data: divisionData, isLoading: divisionLoading } =
    useGetDivisionQuery(undefined);

  const { data: tourTypeData, isLoading: tourTypeLoading } =
    useGetTourTypesQuery({ limit: 1000, fields: '_id, name' });

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

  const handleDivisionChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('division', value);
    // console.log(params.get("division"));
    setSearchParams(params);
  };

  const handleTourTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('tourType', value);
    setSearchParams(params);
  };

  const handleClearFilter = () => {
    const params = new URLSearchParams();
    params.delete('division');
    params.delete('tourType');
    setSearchParams(params);
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
          onValueChange={handleDivisionChange}
          value={selectedDivision ? selectedDivision : ''}
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
        <Select
          onValueChange={handleTourTypeChange}
          value={selectedTourType ? selectedTourType : ''}
        >
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
