const AuctionShow = ({ auction }) => {
  return (
    <div>
      <h1>{auction.title}</h1>
      <h4>Price: {auction.price}</h4>
    </div>
  );
};

AuctionShow.getInitialProps = async (context, client) => {
  const { auctionId } = context.query;
  const { data } = await client.get(`/api/v1/auctions/${auctionId}`);
  return data;
};

export default AuctionShow;
