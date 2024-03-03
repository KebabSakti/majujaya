import { BannerModel } from "../../../../lib/model/banner-model";

export default function EditBannerForm({ banner }: { banner: BannerModel }) {
  return <>{banner.name}</>;
}
