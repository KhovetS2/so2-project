import { Reservation } from "../type/Reservation"

type Props = {
  reserva: Reservation;
};

export default function CardReserva({ reserva }: Props) {
  return (
    <div className="group relative bg-zinc-500 p-10 w-96 rounded-lg">
      <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
        <img
          src={reserva.foto}
          alt="Foto Ilustrativa da Sala"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <h3 className="mt-6 text-sm text-gray-500">
        <span className="absolute inset-0" />
        Nome da Sala: {reserva.name_room}
      </h3>
      <p className="text-base font-semibold text-white">Local da Sala: {reserva.localization}</p>
      <p className="text-base font-semibold text-white">Data de Uso: {new Date(reserva.start_hour).toLocaleDateString()}</p>
      <p className="text-base font-semibold text-white">Hora de Início: {new Date(reserva.start_hour).toLocaleTimeString()}</p>
      <p className="text-base font-semibold text-white">Hora Final: {new Date(reserva.end_hour).toLocaleTimeString()}</p>
      <p className="text-base font-semibold text-white">Responsável: {reserva.responsible}</p>
      <p className="text-base font-semibold text-white">Motivo do Uso: {reserva.use_reason}</p>
      <p className="text-base font-semibold text-white">Informações Gerais: {reserva.general_info}</p>
    </div>
  );
}
