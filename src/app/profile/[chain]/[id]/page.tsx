import ProfileDetail from "@/components/Registry/ProfileDetail";
import {
  IProfileDetailResponse,
  TProfileDetail,
} from "@/components/Registry/types";
import { getProfileDetailDataQuery, graphqlEndpoint , getMicroGrants} from "@/utils/query";
import request from "graphql-request";

export default async function ProfileDetailPage({
  params,
}: {
  params: { id: string; chain: number };
}) {
  const profileDetails: IProfileDetailResponse = await request(
    graphqlEndpoint,
    getProfileDetailDataQuery,
    {
      chainId: params.chain,
      profileId: params.id,
    }
  );



  const grantsDetails = await request(
    graphqlEndpoint,
    getMicroGrants,
    {
      poolId: "19",
      chainId: params.chain,
    }
  );

  console.log(grantsDetails,"grant");

  const profile: TProfileDetail = profileDetails.profile;

  const response = await fetch(
    `https://gitcoin.mypinata.cloud/ipfs/${profile.metadataPointer}`,
  );

  let metadata = "";

  if (response.ok) metadata = await response.text();

  return (
    <div>
      <ProfileDetail profile={profile} metadata={metadata} />
    </div>
  );
}
