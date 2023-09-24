import axios from "axios";
import { Machine, assign } from "xstate";
import { API_URL } from "../constants";

export interface NodeObject {
  title: string;
  nid_dont_use: string;
  field_photo_image_section: string;
  path: string;
  nid: string;
  photo_image_nids: string;
  ImageStyle_thumbnail: string;
  last_update: number;
  views_count: number;
  author_uid: number;
  author_name: string;
}

export interface DataArrayItem {
  node: NodeObject;
}

interface FetchContext {
  page: number;
  data: DataArrayItem[];
}

type FetchEvent = { type: "FETCH_NEXT_PAGE" };

export const scrollFetchMachine = Machine<FetchContext, FetchEvent>(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QDMwBcDGALAdASwgBswBiAMQFEAVAYQAkB9AOQoA0qGAFAQQHEKA2gAYAuolAAHAPaw8aPFIB24kAA9EARgBMAVhwBODUIBsQgMzaNZoVpsAaEAE9NJnFq0AOAOy6vHoQAsQjrGZgC+YQ6omLiEUgCGEHiKUCQQSmD4igBuUgDWmdHYOHGJyVAIybkY8fJKwiINKtKydcpIaog6AfoGxt7GXl46wwEeDs4I7nr6Zh5mI0PGGkNCXhFR6MWlSSkkYABOB1IHOBKEtcgnALY4RbEJuxVVUjVtDU0dLXIK7aDqCG6vX0-S8g2Go3GTk01hwATM7g8HmWGgCPg8AQ2IHuOFgAFcMBg4LByNR6Mw2BwePxPpIZD8lCoAUC+gMhiNulDJitjDhQYYgTp9PoApjItitrhkPE8IQ8QdSJRaIwWOwuHxBKJmvS2kyuj1WWD2ZCJogPBocBpzRjQhYtPohBp9BFxYopBA4Cp7trWr89QgALTGU2B3lCcMRyOR9binEEYg+hl-ToIAJaENGXkaIy6fReNP6IXGMWbGIlR7lRO6joAsywrwmYy6HRaVHWFYhjxaHDs80BHTBaz9mOl4r4wnEqt+muIUY94teB0aEaDZYZjF8geDDw6FY+YbhWOSu4yuUKqeMmcIOdgtFLldgjSd3qo4cBYzGfTzRcxiJAA */
    id: "fetch",
    initial: "loading",
    context: {
      page: 0,
      data: [],
    },
    states: {
      loading: {
        invoke: {
          src: "fetchPage",
          onDone: {
            target: "success",
            actions: assign({
              page: (context) => context.page + 1,
              data: (context, event) => context.data.concat(event.data),
            }),
          },
          onError: "failure",
        },
      },
      success: {
        on: {
          FETCH_NEXT_PAGE: "loading",
        },
      },
      failure: {
        on: {
          FETCH_NEXT_PAGE: "loading",
        },
      },
    },
  },
  {
    services: {
      fetchPage: async (context) => {
        const data = await axios(API_URL, {
          params: {
            page: context.page,
          },
        });
        const rem = data.data.data.nodes;

        return rem;
      },
    },
  }
);
