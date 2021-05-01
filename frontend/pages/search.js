import { GET_MENUS } from '../src/queries/get-menus';
import client from '../src/apollo/client';
import {isEmpty} from 'lodash';
import { handleRedirectsAndReturnData } from '../src/utils/slug';
import Header from '../src/components/layout/header';
import Footer from '../src/components/layout/footer';
import SearchBox from '../src/components/search/search-box';
import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_SEARCH_RESULTS, GET_SEARCH_RESULTS_WITH_TOTAL_PAGES } from '../src/queries/search/get-search-results';
import { PER_PAGE_FIRST } from '../src/utils/pagination';
import LoadMorePosts from '../src/components/news/load-more-posts';
import Loading from '../src/components/loading';
import ErrorMessage from '../src/components/error'
import ResultInfo from '../src/components/search/result-info';
import Router from 'next/router';

export default function Search({data}) {

  const {header, footer, headerMenus, footerMenus, slug} = data || {};
  const searchQueryString = process.browser ? Router?.query?.s : '';
  const [ searchQuery, setSearchQuery ] = useState(searchQueryString);
  const [ searchError, setSearchError ] = useState( '' );
  const [ queryResultPosts, setQueryResultPosts ] = useState( {} );
  const [ showResultInfo, setShowResultInfo ] = useState( false );

  const [ fetchPosts, { loading } ] = useLazyQuery( GET_SEARCH_RESULTS_WITH_TOTAL_PAGES, {
    notifyOnNetworkStatusChange: true,
    onCompleted: ( data ) => {
      setQueryResultPosts( data?.posts ?? {} )
      setShowResultInfo( true )
    },
    onError: ( error => {
      setSearchError( error?.graphQLErrors ?? '' );
    } )
  } )

  const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    setShowResultInfo( false )

    if ( isEmpty(searchQuery) ) {
      setSearchError( 'Please enter text to search' );
      setQueryResultPosts( {} );
      return null;
    }

    setSearchError( '' );
    fetchPosts({
      variables: {
        first: PER_PAGE_FIRST,
        after: null,
        query: searchQuery
      }
    })
  }

  useEffect( () => {
    if ( searchQueryString ) {
      setSearchQuery(searchQueryString);
      fetchPosts({
        variables: {
          first: PER_PAGE_FIRST,
          after: null,
          query: searchQuery
        }
      })
    }

  }, [searchQueryString] )

  const totalPostResultCount =  queryResultPosts?.pageInfo?.offsetPagination?.total;

  return (
    <>
      <Header header={header} headerMenus={headerMenus?.edges ?? []} slug={slug}/>
      <SearchBox
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchFormSubmit={handleSearchFormSubmit}
      />
      <ResultInfo showResultInfo={showResultInfo} totalPostResultCount={totalPostResultCount}/>
      <ErrorMessage text={searchError} classes="max-w-xl mx-auto -mt-8"/>
      <Loading visible={loading} showSpinner classes="mx-auto text-center -mt-8"/>
      <LoadMorePosts
        posts={queryResultPosts}
        graphQLQuery={GET_SEARCH_RESULTS}
        searchQuery={searchQuery}
        classes="md:container px-5 py-12 mx-auto min-h-almost-screen"
      />
      <Footer footer={footer} footerMenus={footerMenus?.edges ?? []} />
    </>
  )
}

export async function getStaticProps() {
  const { data, errors } = await client.query({
    query: GET_MENUS
  })

  const defaultProps = {
    props: {
      data: { ...data, slug: 'search' }
    },
    revalidate: 1
  }

  return handleRedirectsAndReturnData( defaultProps, data, errors, 'headerMenus' )
}
