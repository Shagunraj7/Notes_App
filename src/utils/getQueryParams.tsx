import { FetchNotesParams } from "../api.types";

export function getQueryparams(currentPage : number , folderId : string | undefined) {
    const queryParams: FetchNotesParams = {
        archived: false,
        favorite: false,
        deleted: false,
        page: currentPage,
        folderId,
      };
      if (location.pathname.startsWith("/favorites")) {
        queryParams.folderId = undefined;
        queryParams.favorite = true;
      } else if (location.pathname.startsWith("/archived")) {
        queryParams.favorite = undefined;
        queryParams.archived = true;
        queryParams.folderId = "";
      } else if (location.pathname.startsWith("/trash")) {
        queryParams.deleted = true;
        queryParams.folderId = "";
      } else if (folderId) {
        queryParams.favorite = undefined;
      }
      return queryParams;
}