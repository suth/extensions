import { ActionPanel, List } from "@raycast/api";
import React, { useState } from "react";
import { getCuratedPhotos } from "./hooks/hooks";
import { ActionToPexels, PhotosListItem } from "./utils/ui-component";

export default function SearchCuratedPhotos() {
  const [page, setPage] = useState<number>(1);
  const { pexelsPhotos, loading } = getCuratedPhotos(page);

  return (
    <List
      isShowingDetail={pexelsPhotos?.photos?.length !== 0}
      isLoading={loading}
      searchBarPlaceholder={"Search photographers"}
      onSelectionChange={(id) => {
        if (typeof id !== "undefined") {
          const _id = pexelsPhotos?.photos.length - 1 + "_" + pexelsPhotos?.photos[pexelsPhotos.photos.length - 1]?.id;
          if (id === _id) {
            setPage(page + 1);
          }
        }
      }}
    >
      {!loading && pexelsPhotos?.photos?.length === 0 ? (
        <List.EmptyView
          title={"Welcome to Pexels"}
          icon={"empty-view-icon.png"}
          actions={
            <ActionPanel>
              <ActionToPexels />
            </ActionPanel>
          }
        />
      ) : (
        pexelsPhotos?.photos.map((value, index) => <PhotosListItem key={index} pexelsPhoto={value} index={index} />)
      )}
    </List>
  );
}
