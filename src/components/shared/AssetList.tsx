import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAssets } from "@/hook/useAssets";


export default function AssetList() {

  const { assets, loading, error } = useAssets();

  if (loading) {
    return (
      <div className="p-4 grid gap-4">
        {[...Array(3)].map((_, idx) => (
          <Skeleton key={idx} className="h-20 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Your Assets</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {assets.length === 0 ? (
            <div className="text-gray-500">No assets found.</div>
          ) : (
            assets.map((asset, idx) => (
              <Card key={idx} className="flex items-center justify-between p-4">
                <div className="text-lg font-semibold">
                  {asset.denom}
                </div>
                <div className="text-gray-700">
                  {asset.amount}
                </div>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
