type DetailAuction = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  setting_date: Date;
  end_date: Date;
  owner: {
    username: string;
    password: string;
    admin: boolean;
  };
  highest_bidder: {
    username: string;
    password: string;
    admin: boolean;
  };
};

export default DetailAuction;
