import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import FoldingArrow from '../../FoldingArrow';

interface Props {
  category: Category;
  isFolding: boolean;
  toggleFolding: () => void;
}
export default function CategoryTitle({
  category,
  isFolding,
  toggleFolding,
}: Props) {
  const router = useRouter();
  const { main, sub } = router.query;
  const isParent = category.parent === null ? true : false;
  const currentCategoryName = isParent && !sub ? main : sub;
  return (
    <div className="w-full flex flex-row justify-between gap-5">
      <Link
        href={isParent ? '/categories/[main]' : '/categories/[main]/[sub]'}
        as={
          isParent
            ? `/categories/${category.name}`
            : `/categories/${category.parent}/${category.name}`
        }
      >
        <a>
          <p
            className={`py-2 leading-none ${
              isParent ? 'text-xl font-bold' : 'text-base font-semibold'
            }${currentCategoryName === category.name ? ' text-red-500' : ''}`}
            title={category.name}
          >
            {category.name}
          </p>
        </a>
      </Link>
      <button
        onClick={toggleFolding}
        className="text-2xl leading-none"
        aria-label="Expend Button"
      >
        <FoldingArrow isFolding={isFolding} />
      </button>
    </div>
  );
}
