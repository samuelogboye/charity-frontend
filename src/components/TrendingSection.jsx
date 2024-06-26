import React, { useEffect, useState, useContext } from "react";
// import { trendingdata } from "../Data";
import { getTrendingCampaigns } from "../config/api";
import { Link } from "react-router-dom";
import { clampDescription } from "../services/utils";
import { CurrencyContext } from "../context/CurrencyContext";
import { formatCurrency } from "../services/utils";
// import AuthContext from "../auth/context/AuthContext";

const TrendingSection = () => {
  //   const { user } = useContext(AuthContext);
  //   console.log("user", user);
  const [trendingCampaigns, setTrendingCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { currency } = useContext(CurrencyContext);

  useEffect(() => {
    const fetchTrendingCampaigns = async () => {
      setLoading(true);
      try {
        const data = await getTrendingCampaigns();
        // if data is null
        if (!data) {
          return;
        }
        setTrendingCampaigns(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingCampaigns();
  }, []);

  //   function clampDescription(description) {
  //     const words = description.split(" "); // Split the description into words
  //     if (words.length > 20) {
  //       return words.slice(0, 25).join(" ") + "..."; // Take the first 20 words and append '...'
  //     } else {
  //       return description; // Return the original description if it's 20 words or less
  //     }
  //   }
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className=" bg-[#FEFEFE] w-full">
      <div className="container mx-auto w-full">
        <div className="py-6 md:py-12">
          <div className="flex flex-col items-center sm:max-auto">
            <h3 className="mb-4 tracking-wide text-center ">
              {" "}
              Discover Trending Causes
            </h3>
            <p className="max-w-2xl font-medium text-center leading-5 text-[#515151] text-md">
              Each cause is a chapter in our collective story of compassion.
              Explore, engage, and make a lasting impact – because changing the
              world starts with your support.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:max-w-full sm:mx-auto xl:max-w-full mt-10 lg:mt-16">
            {trendingCampaigns.map((campaign) => (
              <Link key={campaign.id} to={`/campaign/${campaign.id}`}>
                <div
                  key={campaign.id}
                  className="overflow-hidden transition-shadow duration-300 bg-white rounded-md flex flex-col justify-between"
                  style={{ minHeight: "500px" }}
                >
                  <img
                    src={campaign.images[0]?.image}
                    className="object-cover w-full h-64 rounded-md"
                    alt={campaign.title}
                    loading="lazy"
                  />
                  <div className="p-2">
                    <h4 className="text-[#161616] truncate">
                      {campaign.title}
                    </h4>
                    <p className="text-[12px] text-[#515151]">
                      {clampDescription(campaign.description)}
                    </p>
                  </div>
                  {/*--- prohress bar----*/}
                  <div className="w-[326px] lg:w-[368px] h-[72px] flex-col justify-start items-start gap-1 inline-flex">
                    <div className="self-stretch h-12 relative">
                      <div className="w-full h-2 left-0 top-[40px] absolute">
                        <div className="w-full h-2 left-0 top-0 absolute bg-neutral-200 rounded-lg" />
                        <div
                          style={{
                            width: `${(campaign.raised / campaign.goal) * 100}%`,
                          }}
                          className="h-2 left-0 top-0 absolute bg-[#04A38A] rounded-lg transition-width duration-300"
                        />
                      </div>
                      <div
                        style={{
                          left: `calc(${(campaign.raised / campaign.goal) * 100}% - 33px)`,
                        }}
                        className="w-[66px] h-9 top-0 absolute"
                      >
                        <div className="w-full h-7 px-2 py-1 bg-emerald-50 rounded-lg justify-center items-center inline-flex">
                          <div className="text-center text-emerald-700 text-sm font-bold font-['Nunito'] leading-tight">
                            {formatCurrency(campaign.raised, currency)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch justify-start items-start inline-flex">
                      <div className="grow shrink basis-0 h-5 justify-end items-center gap-2.5 flex">
                        <div className="grow shrink basis-0 text-right text-emerald-700 text-sm font-bold font-['Nunito'] leading-tight">
                          {formatCurrency(campaign.goal, currency)}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*==============people donation======*/}
                  <div className="flex-col justify-start items-start gap-3 flex pt-4">
                    <div className="justify-start items-start inline-flex">
                      <div className="justify-start items-start flex -mr-0">
                        {campaign.donor_count >= 1 && (
                          <img
                            className="w-10 h-10 rounded-full border border-white"
                            src="/assets/image1.jpg" // Assuming different images for each donor
                            alt="activeUser1"
                            loading="lazy"
                          />
                        )}
                        {campaign.donor_count >= 2 && (
                          <img
                            className="w-10 h-10 -ml-2 rounded-full border border-white"
                            src="/assets/image2.jpg"
                            alt="activeUser2"
                            loading="lazy"
                          />
                        )}
                        {campaign.donor_count >= 3 && (
                          <img
                            className="w-10 h-10 -ml-2 rounded-full border border-white"
                            src="/assets/image3.jpg"
                            alt="activeUser3"
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div className="w-[190px] px-4 py-2 bg-orange-50 rounded-[20px] justify-center items-center flex">
                        <div className="text-yellow-800 text-sm font-semibold  leading-tight">
                          +{campaign.donor_count}{" "}
                          {campaign.donor_count <= 1
                            ? "person is donating"
                            : "people are donating"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center">
            <Link to="/discover">
              <button className="border border-[#04A38A] text-[#04A38A] rounded-md py-3 px-5 font-medium">
                See more campaigns
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;