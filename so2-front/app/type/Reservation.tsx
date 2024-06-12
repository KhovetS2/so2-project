import { User } from "./User"

export type Reservation =
  {
    idReservation: string,
    name_room: string,
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
        user: {
          name: string,
          email: string,
          password: string,
          id: number
        },
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
