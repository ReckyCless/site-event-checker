import { Fragment } from "react";
import Image from "next/image";

import { Dialog, Transition } from "@headlessui/react";
import { EventProps } from "@/types";
import { parseISO, format } from "date-fns";
import CustomButton from "./CustomButton";

interface EventDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  event: EventProps;
}

const EventDetails = ({ isOpen, closeModal, event }: EventDetailsProps) => (
  <>
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-out duration-300"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                <button
                  type="button"
                  className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                  onClick={closeModal}
                >
                  <Image
                    src="/close.svg"
                    alt="close"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </button>

                <div className="flex-1 flex flex-col gap-3">
                  <div className="relative w-full h-80 rounded-lg">
                    <Image
                      src={"/card_placeholder.svg"}
                      alt="event image"
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-2">
                  <h2 className="font-semibold text-xl capitalize">
                    {event.title}
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-4">
                    <div className="flex justify-between gap-5 w-full text-right">
                      <h4 className="text-grey capitalize">Тип</h4>
                      <p className="text-black-100 font-semibold">
                        {event.type_name}
                      </p>
                    </div>
                    <div className="flex justify-between gap-5 w-full text-right">
                      <h4 className="text-grey capitalize">Описание</h4>
                      <p className="text-black-100 font-semibold">
                        {event.description}
                      </p>
                    </div>
                    <div className="flex justify-between gap-5 w-full text-right">
                      <h4 className="text-grey capitalize">Локация</h4>
                      <p className="text-black-100 font-semibold">
                        {event.location}
                      </p>
                    </div>
                    <div className="flex justify-between gap-5 w-full text-right">
                      <h4 className="text-grey capitalize">Время начала</h4>
                      <p className="text-black-100 font-semibold">
                        {format(event.start_time, "dd.LL.yyyy / HH:mm")}
                      </p>
                    </div>
                    <div className="flex justify-between gap-5 w-full text-right">
                      <h4 className="text-grey capitalize">Организация</h4>
                      <p className="text-black-100 font-semibold">
                        {event.organisation_title}
                      </p>
                    </div>
                    <div className="flex justify-between gap-5 w-full text-right">
                      <h4 className="text-grey capitalize">Автор</h4>
                      <p className="text-black-100 font-semibold">
                        {event.creator_name} {event.creator_surname}{" "}
                        {event.creator_patronymic}
                      </p>
                    </div>
                    <div className="flex justify-between gap-5 w-full text-right">
                      <h4 className="text-grey capitalize">Контакты</h4>
                      <p className="text-black-100 font-semibold">
                        {event.creator_email}
                      </p>
                    </div>
                  </div>
                  <CustomButton
                    title="Записаться"
                    containerStyles="bg-primary-blue text-white rounded-full mt-10"
                    handleClick={() => {}}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  </>
);

export default EventDetails;
