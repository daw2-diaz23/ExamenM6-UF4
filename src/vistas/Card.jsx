import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { Pencil, Trash2 } from "lucide-react";

const CardItem = ({ title, date, description, imageUrl, onEdit, onDelete }) => (
  <Card isFooterBlurred className="relative w-full h-[300px] col-span-12 sm:col-span-6 md:col-span-4 mb-4">
    <CardHeader className="absolute z-10 top-2 left-2 flex-col items-start">
      <p className="text-tiny text-white/60 uppercase font-bold">{title}</p>
      <h4 className="text-white/90 font-medium text-xl">{date}</h4>
    </CardHeader>
    <Image
      removeWrapper
      alt="Card image"
      className="z-0 w-full h-full object-cover"
      src={imageUrl}
    />
    <CardFooter className="absolute bg-black/40 bottom-0 z-10 w-full flex justify-between items-center p-2">
      <p className="text-tiny text-white/60">{description}</p>
      <div className="flex gap-2">
        <Button auto light onClick={onEdit}>
          <Pencil className="text-white" />
        </Button>
        <Button auto light onClick={onDelete}>
          <Trash2 className="text-white" />
        </Button>
      </div>
    </CardFooter>
  </Card>
);

export default CardItem;
