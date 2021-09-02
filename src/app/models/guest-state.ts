export class GuestState {
    id?: number;
    stateName: string;

  constructor(guestState: GuestState) {
    Object.assign(this, guestState);
  }
}
