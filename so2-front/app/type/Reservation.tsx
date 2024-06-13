import { User } from "./User"

export type Reservation =
  {
    idReservation: string,
    name_room: string,
    localization: string,
    start_hour: string,
    end_hour: string,
    responsible: number,
    use_reason: string,
    general_info: string,
    foto: string,
    id: number,
    user: User,
    invites: [
      {
        user_id: number,
        reservation_id: number,
        user: User,
        reservation: {
          idReservation: string,
          name_room: string,
          start_hour: string,
          end_hour: string,
          responsible: number,
          use_reason: string,
          general_info: string,
          foto: string,
          id: number,
          user: User
        }
      }
    ]
  }
