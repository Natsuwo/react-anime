import React, { useEffect, useState } from "react";
import "./Search.css";
import { Link, useLocation } from "react-router-dom";
import { searchHandler } from "../../../features/useFetch";
import Breadcumb from "../../Global/Breadcrumb/Breadcumb";
import UseIconList from "../../Global/SvgList/UseIconList";
import { CardVideo } from "../../Global/Card/Card";
import YureiLoading from "../../Global/YureiLoading/YureiLoading";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const location = useLocation();
  const getQueryParam = () => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get("q") || "";
  };

  const handleSearch = async () => {
    const query = getQueryParam();
    setSearchQuery(query);
    if (query) {
      const results = await searchHandler(query);
      if (results.success) {
        setSearchResults(results);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    handleSearch();
  }, [location.search]);

  const breadcrumb = [{ title: "Search" }];

  return (
    <main className="page-main">
      <div className="page-container">
        {isLoading && (
          <div className="search-empty-wrapper">
            <div className="search-empty-text">
              <YureiLoading />
            </div>
          </div>
        )}

        {!isLoading && (
          <div className="container__mobile">
            <Breadcumb items={breadcrumb} />
            <h1 className="search-main-title">Result of {searchQuery}</h1>
            <div className="search-container">
              {searchResults?.isRecommend ? (
                <>
                  <div className="search-empty-wrapper">
                    <p className="search-empty-text">
                      Oops, not found your videos :(
                    </p>
                  </div>
                  <div>
                    <section>
                      <div className="search-headline mt-2">
                        <h2 className="search-empty-title">
                          Recommend for you
                        </h2>
                      </div>
                      <div className="search-content">
                        <div className="card-flex-container">
                          {searchResults?.videos?.map((item, index) => (
                            <div key={index} className="card-flex-item">
                              <CardVideo
                                video_id={item.id}
                                highlighted_thumbnail={
                                  item.highlighted_thumbnail
                                }
                                vertical_thumbnail={item.thumbnail_vertical_url}
                                horizontal_thumbnail={
                                  item.thumbnail_horizontal_url
                                }
                                last_modified_date={item.last_modified_date}
                                upload_date={item.upload_date}
                                title={item.title}
                                props={item}
                              ></CardVideo>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  </div>
                </>
              ) : (
                <>
                  <section>
                    <div className="search-headline mt-2">
                      <h2>Series</h2>
                      {searchResults?.totalResults > 8 && (
                        <Link className="search-view-more link-block">
                          <span className="__text-active">
                            View more ({searchResults?.totalResults} stuffs)
                          </span>
                          <span>
                            <UseIconList icon="chevron-right" />
                          </span>
                        </Link>
                      )}
                    </div>
                    <div className="search-content">
                      <div className="card-flex-container">
                        {searchResults?.videos?.map((item, index) => (
                          <div key={index} className="card-flex-item">
                            <CardVideo
                              video_id={item.id}
                              highlighted_thumbnail={item.highlighted_thumbnail}
                              vertical_thumbnail={item.thumbnail_vertical_url}
                              horizontal_thumbnail={
                                item.thumbnail_horizontal_url
                              }
                              last_modified_date={item.last_modified_date}
                              upload_date={item.upload_date}
                              title={item.title}
                              props={item}
                            ></CardVideo>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                  <section>
                    <div className="search-headline mt-2">
                      <h2>Episodes</h2>
                      {searchResults?.totalEpisodesCount > 8 && (
                        <Link className="search-view-more link-block">
                          <span className="__text-active">
                            View more ({searchResults?.totalEpisodesCount}{" "}
                            stuffs)
                          </span>
                          <span>
                            <UseIconList icon="chevron-right" />
                          </span>
                        </Link>
                      )}
                    </div>
                    <div className="search-content">
                      <div className="card-flex-container">
                        {searchResults?.episodes?.map((item, index) => (
                          <div key={index} className="card-flex-item">
                            <CardVideo
                              video_id={item.id}
                              thumbnail_url={item.thumbnail_url}
                              last_modified_date={item.last_modified_date}
                              upload_date={item.upload_date}
                              title={item.title}
                              props={item}
                            ></CardVideo>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Search;
