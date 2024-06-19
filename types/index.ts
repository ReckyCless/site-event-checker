import { MouseEventHandler } from "react";

export interface EventProps {
  id: number;
  title: string;
  description: string;
  type_name: string;
  type_id: number;
  location: string;
  start_time: Date;
  end_time?: Date;
  image_path?: string;
  organisation_title: string;
  organisation_logo?: string;
  organisatoin_site_url?: string;
  creator_name: string;
  creator_surname: string;
  creator_patronymic?: string;
  creator_email: string;
  creator_phone?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface FilterProps {
  title?: string;
  event_type?: string;
  limit?: number;
}

export interface HomeProps {
  searchParams: FilterProps;
}

export interface EventCardProps {
  id: number;
  title: string;
  description: string;
  type_name: string;
  type_id: number;
  location: string;
  start_time: Date;
  end_time?: Date;
  image_path?: string;
  organisation_title: string;
  organisation_logo?: string;
  organisatoin_site_url?: string;
  creator_name: string;
  creator_surname: string;
  creator_patronymic?: string;
  creator_email: string;
  creator_phone?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface CustomButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  title: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface OptionProps {
  title: string;
  value: string;
}

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}
