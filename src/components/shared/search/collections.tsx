import { getCollections } from '@/lib/shopify';
import { Suspense } from 'react';
import { FilterList } from './filter';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui';


async function CollectionList() {
  const collections = await getCollections();
  return <FilterList list={collections} title="Collections" />;
}

// const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded-sm';
// const activeAndTitles = 'bg-neutral-500';
const items = 'bg-neutral-300';


export default function Collections() {
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
         <div className={cn(<Skeleton className='mb-3 h-4 w-5/6 rounded-sm'/>, items)} />
          <div className={cn(<Skeleton className='mb-3 h-4 w-5/6 rounded-sm'/>, items)} />
          <div className={cn(<Skeleton className='mb-3 h-4 w-5/6 rounded-sm'/>, items)} />
          <div className={cn(<Skeleton className='mb-3 h-4 w-5/6 rounded-sm'/>, items)} />
          <div className={cn(<Skeleton className='mb-3 h-4 w-5/6 rounded-sm'/>, items)} />
          <div className={cn(<Skeleton className='mb-3 h-4 w-5/6 rounded-sm'/>, items)} />
          <div className={cn(<Skeleton className='mb-3 h-4 w-5/6 rounded-sm'/>, items)} />
          <div className={cn(<Skeleton className='mb-3 h-4 w-5/6 rounded-sm'/>, items)} />
          <div className={cn(<Skeleton className='mb-3 h-4 w-5/6 rounded-sm'/>, items)} />
          <div className={cn(<Skeleton className='mb-3 h-4 w-5/6 rounded-sm'/>, items)} />
        </div>
      }
    >
      <CollectionList />
    </Suspense>
  );
}
