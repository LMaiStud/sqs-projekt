type Auction = {
  id?: number;
  title?: string;
  description: string;
  price: number;
  setting_date: Date;
  end_date: Date;
  owner: string;
  highest_bidder: string;
  image: string;
};
export default Auction;
