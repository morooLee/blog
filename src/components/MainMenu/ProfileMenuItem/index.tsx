import React, { useEffect, useState, MouseEvent } from 'react';
import Link from 'next/link';
import SectionSummary from 'src/components/SectionSummary';
import ContactList from 'src/components/ContactList';
import SectionContent from 'src/components/SectionContent';
import ProfileImage from 'public/assets/profile-image.jpeg';
import Image from 'next/image';

interface Props {
  expand: boolean;
}
export default function ProfileMenuItem({ expand }: Props) {
  const [isFolding, handleFolding] = useState<boolean>(!expand);

  function toggleFolding() {
    handleFolding(!isFolding);
  }

  function handleOnClick(event: MouseEvent<HTMLDivElement>) {
    const { target, currentTarget } = event;

    if (target === currentTarget) {
      toggleFolding();
    }
  }

  useEffect(() => {
    handleFolding(!expand);
  }, [expand]);

  return (
    <div className="w-full xl:w-62 2xl:w-80 bg-canvas border rounded-md">
      <SectionSummary
        isFolding={isFolding}
        toggleFolding={toggleFolding}
        onClick={handleOnClick}
      >
        <Link href="/profile" as="/profile">
          <a className="mr-auto text-accent text-xl font-semibold">
            <p title="프로필">프로필</p>
          </a>
        </Link>
        <p
          title="@moroo"
          className="hidden sm:block lg:hidden text-xl text-accent font-semibold hover:cursor-text"
        >
          @moroo
        </p>
        <ContactList />
      </SectionSummary>
      <SectionContent isFolding={isFolding}>
        <div className="flex flex-row lg:flex-col gap-5 sm:gap-8 lg:gap-5 justify-center items-center pb-5 pt-5 px-5 2xl:pt-8 ">
          <div className="relative min-w-50 w-50 min-h-50 h-50 rounded lg:mx-auto border">
            <Image
              src={ProfileImage}
              alt="Profile Image"
              layout="fill"
              objectFit="cover"
              className="rounded"
              priority={true}
              quality={80}
            />
          </div>
          <hr className="hidden sm:block lg:hidden w-1 h-40 bg-btn-hover rounded-md" />
          <div className="flex flex-col gap-3 items-start lg:items-center">
            <div className="lg:text-center">
              <p className="text-accent text-xl font-semibold">@moroo</p>
              <p className="font-bold">Soonhan Lee</p>
            </div>
            <div className="lg:text-center">
              <p>Software Quality Assurance</p>
              <p>Test Automation Engineer</p>
            </div>
            <Link href="/profile" as="/profile">
              <a className="lg:hidden">
                <i className="text-link-accent font-semibold">See more...</i>
              </a>
            </Link>
          </div>
        </div>
      </SectionContent>
    </div>
  );
}
