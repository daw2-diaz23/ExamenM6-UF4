import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
// Importamos los componentes Card, CardHeader, CardBody, CardFooter, Image y Button desde la biblioteca @nextui-org/react.
import { Pencil, Trash2 } from "lucide-react";


const CardItem = ({ title, date, description, imageUrl, onEdit, onDelete }) => (
  // Definimos el componente funcional CardItem que recibe las props: title, date, description, imageUrl, onEdit y onDelete.
  <Card isFooterBlurred className="relative w-full h-[300px] col-span-12 sm:col-span-6 md:col-span-4 mb-4">
    {/* Usamos el componente Card con las propiedades isFooterBlurred y className para aplicar estilos. */}
    {/* La clase "relative" permite posicionar elementos absolutamente dentro del card. */}
    {/* "w-full" hace que el card ocupe todo el ancho del contenedor. */}
    {/* "h-[300px]" define una altura fija de 300 píxeles para el card. */}
    {/* "col-span-12 sm:col-span-6 md:col-span-4" define la cantidad de columnas que el card ocupará en diferentes tamaños de pantalla. */}
    {/* "mb-4" agrega un margen inferior de 4 unidades para separar las tarjetas. */}
    <CardHeader className="absolute z-10 top-2 left-2 flex-col items-start">
      {/* Usamos el componente CardHeader con clases de estilo para posicionar el encabezado absolutamente en la esquina superior izquierda del card. */}
      {/* "absolute" lo posiciona absolutamente respecto al card. */}
      {/* "z-10" asegura que el encabezado esté por encima de otros elementos. */}
      {/* "top-2" y "left-2" lo desplazan ligeramente hacia abajo y hacia la derecha. */}
      {/* "flex-col" y "items-start" alinean los elementos del encabezado en una columna y al principio del contenedor. */}
      <p className="text-tiny text-white/60 uppercase font-bold">{title}</p>
      {/* Parrafo que muestra el título en mayúsculas, pequeño, con un color blanco semitransparente y negrita. */}
      <h4 className="text-white/90 font-medium text-xl">{date}</h4>
      {/* Encabezado que muestra la fecha en blanco, con opacidad del 90%, de tamaño extra grande y con un peso de fuente medio. */}
    </CardHeader>

    <Image
      removeWrapper
      alt="Card image"
      className="z-0 w-full h-full object-cover"
      src={imageUrl}
    />
    {/* Componente de imagen que se muestra como fondo del card. */}
    {/* "removeWrapper" elimina cualquier envoltorio adicional alrededor de la imagen. */}
    {/* "alt" proporciona un texto alternativo para la imagen. */}
    {/* "className" aplica estilos para asegurar que la imagen cubra todo el fondo del card. */}
    {/* "src" define la URL de la imagen que se va a mostrar. */}
    <CardFooter className="absolute bg-black/40 bottom-0 z-10 w-full flex justify-between items-center p-2">
      {/* Usamos el componente CardFooter para crear el pie del card. */}
      {/* "absolute" lo posiciona absolutamente en la parte inferior del card. */}
      {/* "bg-black/40" agrega un fondo negro semitransparente. */}
      {/* "bottom-0" lo alinea con la parte inferior del card. */}
      {/* "z-10" asegura que el pie esté por encima de otros elementos. */}
      {/* "w-full" hace que el pie ocupe todo el ancho del card. */}
      {/* "flex justify-between items-center" distribuye los elementos dentro del pie equitativamente con los elementos centrados. */}
      {/* "p-2" agrega un padding alrededor del pie para espaciar los contenidos. */}
      <p className="text-tiny text-white/60">{description}</p>
      {/* Parrafo que muestra la descripción de la historia en texto pequeño y blanco semitransparente. */}
      <div className="flex gap-2">
        {/* Div que contiene los botones de edición y eliminación, alineados en una fila con un espacio entre ellos. */}
        <Button auto light onClick={onEdit}>
          <Pencil className="text-white" />
        </Button>
        {/* Botón de edición que llama a la función onEdit cuando se hace clic, mostrando el icono Pencil en blanco. */}
        <Button auto light onClick={onDelete}>
          <Trash2 className="text-white" />
        </Button>
        {/* Botón de eliminación que llama a la función onDelete cuando se hace clic, mostrando el icono Trash2 en blanco. */}
      </div>
    </CardFooter>
  </Card>
);

export default CardItem;
// Exportamos el componente CardItem para que pueda ser utilizado en otras partes de la aplicación.
