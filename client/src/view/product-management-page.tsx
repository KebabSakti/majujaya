import { Carousel, Modal, Rating, Spinner, Textarea } from "flowbite-react";
import { useContext, useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CategoryModel } from "../../../lib/model/category-model";
import { ProductModel } from "../../../lib/model/product-model";
import { DataState, Empty } from "../lib/config/type";
import { currency, debounce } from "../lib/helper/common";
import CategoryRepository from "../lib/repository/category-repository";
import ProductRepository from "../lib/repository/product-repository";
import ModalLoading from "./component/modal-loading";
import { AuthContext } from "./context/auth-context";

const productRepository = new ProductRepository();
const categoryRepository = new CategoryRepository();

export default function ProductMangementPage() {
  const authContext = useContext(AuthContext);
  const coverImageRef = useRef<any>();
  const galleryImageRef = useRef<any>();
  let [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries([...searchParams]);
  const page = parseInt(query.page);
  const limit = parseInt(query.limit);
  const max = (page - 1) * (limit * 2);
  const [debounceSearch] = debounce(search, 500);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState<DataState<Record<string, any>>>();
  const [productDetail, setProductDetail] = useState<ProductModel | Empty>();
  const [image, setImage] = useState<string | Empty>(null);

  const [input, setInput] = useState({
    storeId: query.storeId,
    categoryId: "",
    name: "",
    description: "",
    files: [{ tag: "picture", file: null }],
    varian: [
      { name: "", price: null, wholesaleMin: null, wholesalePrice: null },
    ],
  });

  useEffect(() => {
    getData();
  }, [authContext?.auth]);

  useEffect(() => {
    getData();
  }, [searchParams]);

  async function getData() {
    try {
      setData({ ...data, status: "loading" });

      const categories = await categoryRepository.read();
      const products = await productRepository.read(query);

      const result = {
        category: categories,
        product: products,
      };

      setData({
        ...data,
        status: "loaded",
        data: result,
        error: null,
      });
    } catch (error: any) {
      setData({ ...data, status: "error", error: error });
    }
  }

  async function createProduct() {
    try {
      setLoading(true);
      await productRepository.create(input);
      window.location.reload();
      // setModal(false);
      // setLoading(false);
      // getData();
      // toast("Proses berhasil, produk telah ditambahkan");
    } catch (error: any) {
      console.error(error);
      toast("Terjadi kesalahan, coba beberapa saat lagi");
      setLoading(false);
    }
  }

  async function getProductDetail(id: string) {
    try {
      setLoading(true);
      const result = await productRepository.show(id);

      setProductDetail(result.data);
      setLoading(false);
    } catch (error: any) {
      toast("Terjadi kesalahan, harap coba beberapa saat lagi");
      setLoading(false);
    }
  }

  async function updateProduct(param: Record<string, any>) {
    try {
      setLoading(true);

      await productRepository.update(param);
      const result = await productRepository.show(param.id);

      toast("Proses berhasil, produk berhasil di update");
      setProductDetail(result.data);
      setLoading(false);
      getData();
    } catch (error: any) {
      toast("Terjadi kesalahan, harap coba beberapa saat lagi");
      setLoading(false);
    }
  }

  function search(e: any) {
    const keyword = e.target.value;

    if (keyword.length == 0) {
      delete query.name;
      setSearchParams({ ...query });
    } else {
      setSearchParams({ ...query, name: e.target.value });
    }
  }

  function sortOrder() {
    const direction = query.direction == "desc" ? "asc" : "desc";
    setSearchParams({ ...query, sort: "created", direction: direction });
  }

  function next() {
    if (max < data?.data?.product?.paginate.total!) {
      setSearchParams({ ...query, page: (page + 1) as any });
    }
  }

  function prev() {
    if (page > 1) {
      setSearchParams({ ...query, page: (page - 1) as any });
    }
  }

  function inputOnChange(e: any) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  function multipleInputOnChange(e: any, index: number) {
    const varian = input.varian;

    varian[index] = {
      ...varian[index],
      [e.target.name]:
        e.target.name != "name" ? Number(e.target.value) : e.target.value,
    };

    setInput({ ...input, varian: varian });
  }

  function fileOnChange(e: any) {
    const file = e.target.files[0];
    const updatedFiles = input.files;
    const index = updatedFiles.findIndex((e) => e.tag == "picture");
    updatedFiles[index] = { ...updatedFiles[index], file: file };

    setInput({ ...input, files: updatedFiles });
  }

  function multipleFileOnChange(e: any) {
    const files = Array.from(e.target.files);

    const modifiedFiles = files.map((e: any) => {
      return {
        tag: "gallery",
        file: e,
      };
    });

    const updatedFiles = input.files
      .filter((e) => e.tag == "picture")
      .concat(modifiedFiles);

    setInput({ ...input, files: updatedFiles });
  }

  function formSubmit(e: any) {
    e.preventDefault();

    createProduct();
  }

  return (
    <>
      <div className="bg-surface text-onSurface p-4">
        <div className="flex gap-2 items-center md:justify-end">
          <div className="w-full md:w-fit">
            <input
              type="text"
              placeholder="Cari produk"
              className="border border-gray-400 rounded w-full placeholder:text-gray-300"
              onChange={debounceSearch}
            />
          </div>
          <div className="flex gap-2">
            <button
              className="border border-gray-400 p-2 rounded"
              onClick={sortOrder}
            >
              {query.direction === "desc" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
                  />
                </svg>
              )}
            </button>
            <button
              className="bg-secondary text-onSecondary p-2 rounded"
              onClick={() => {
                setModal(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>
        {(() => {
          if (data?.status == "loading") {
            return (
              <div className="min-h-56 flex justify-center items-center">
                <Spinner />
              </div>
            );
          }

          if (data?.status == "loaded" && data?.data?.product?.data?.length) {
            const products: ProductModel[] = data?.data?.product?.data;

            return (
              <>
                <div className="py-4 grid grid-cols-2 gap-2 md:grid-cols-6">
                  {products.map((e, i) => {
                    const product = e;

                    return (
                      <div
                        key={i}
                        className="border w-full h-64 flex flex-col overflow-hidden cursor-pointer"
                        onClick={() => {
                          getProductDetail(e.id!);
                        }}
                      >
                        <div className="bg-gray-100 h-[60%] shrink-0">
                          <LazyLoadImage
                            src={product.picture}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-2 flex-grow flex flex-col justify-between">
                          <div className="text-sm line-clamp-2">
                            {product.name}
                          </div>
                          <div className="flex flex-col gap-2">
                            {product.active ? (
                              <div className="text-green-500 text-xs px-2 rounded border border-green-500 w-fit">
                                AKTIF
                              </div>
                            ) : (
                              <div className="text-red-500 text-xs px-2 rounded border border-red-500 w-fit">
                                NON AKTIF
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="font-semibold">
                              {currency(product.price!)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {(() => {
                  if (data?.data?.product?.paginate?.total! > products.length) {
                    return (
                      <div className="flex justify-center gap-1 mt-2">
                        <button
                          className="p-2 rounded bg-secondary text-onSecondary"
                          onClick={prev}
                        >
                          PREV
                        </button>
                        <button
                          className="p-2 rounded bg-primary text-onPrimary"
                          onClick={next}
                        >
                          NEXT
                        </button>
                      </div>
                    );
                  }
                })()}
              </>
            );
          }

          return (
            <div className="min-h-56 flex justify-center items-center">
              <div>Tidak ada data</div>
            </div>
          );
        })()}
      </div>
      <Modal
        size="lg"
        show={modal}
        onClose={() => {
          setModal(false);
        }}
      >
        <form onSubmit={formSubmit}>
          <Modal.Header>Tambah Produk</Modal.Header>
          <Modal.Body>
            <div className="flex flex-col gap-4 w-full text-sm text-onSurface">
              <div>
                <select
                  name="categoryId"
                  className="border-gray-200 rounded w-full"
                  value={input.categoryId}
                  required
                  onChange={inputOnChange}
                >
                  <option value="">Pilih Kategori</option>
                  {data?.data?.category?.data.map(
                    (e: CategoryModel, i: number) => {
                      return (
                        <option key={i} value={e.id}>
                          {e.name}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Nama Produk"
                  name="name"
                  required
                  className="border-gray-200 rounded w-full"
                  value={input.name}
                  onChange={inputOnChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Foto Produk"
                  required
                  className="border-gray-200 rounded w-full cursor-pointer"
                  value={(() => {
                    const picture = input.files.find((e) => e.tag == "picture");

                    if (picture?.file != null) {
                      const file = picture?.file as any;
                      return file.name ?? "";
                    }

                    return "";
                  })()}
                  readOnly
                  onClick={() => {
                    coverImageRef.current.click();
                  }}
                />
                <input
                  type="file"
                  name="picture"
                  className="hidden"
                  ref={coverImageRef}
                  onChange={fileOnChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Galeri Produk"
                  required
                  className="border-gray-200 rounded w-full cursor-pointer"
                  value={(() => {
                    const gallery = input.files.filter(
                      (e) => e.tag == "gallery"
                    );

                    if (gallery.length > 0) {
                      return `${gallery.length} produk dipilih`;
                    }

                    return "";
                  })()}
                  readOnly
                  onClick={() => {
                    galleryImageRef.current.click();
                  }}
                />
                <input
                  multiple
                  type="file"
                  name="gallery"
                  className="hidden"
                  ref={galleryImageRef}
                  onChange={multipleFileOnChange}
                />
              </div>
              <div>
                <Textarea
                  placeholder="Deskripsi"
                  name="description"
                  className="border-gray-200 rounded w-full h-36 bg-white text-base"
                  required
                  value={input.description}
                  onChange={inputOnChange}
                />
              </div>
              <div className="flex flex-col gap-1 max-h-56 overflow-scroll no-scrollbar">
                {input.varian.map((e: any, i: any) => {
                  return (
                    <div
                      key={i}
                      className="flex flex-col gap-2 bg-gray-100 p-2 rounded"
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-semibold">
                          Produk Varian {i + 1}
                        </div>
                        {(() => {
                          if (i == 0) {
                            return (
                              <button
                                type="button"
                                className="py-1 px-2 bg-primary rounded text-onPrimary"
                                onClick={() => {
                                  setInput({
                                    ...input,
                                    varian: [
                                      ...input.varian,
                                      {
                                        name: "",
                                        price: null,
                                        wholesaleMin: null,
                                        wholesalePrice: null,
                                      },
                                    ],
                                  });
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                  />
                                </svg>
                              </button>
                            );
                          }

                          return (
                            <button
                              type="button"
                              className="py-1 px-2 bg-red-500 rounded text-white"
                              onClick={() => {
                                const varian = input.varian;
                                varian.splice(i, 1);

                                setInput({
                                  ...input,
                                  varian: varian,
                                });
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 12h14"
                                />
                              </svg>
                            </button>
                          );
                        })()}
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Nama Varian"
                            name="name"
                            required
                            className="border-gray-200 rounded w-full"
                            value={e.name}
                            onChange={(e) => {
                              multipleInputOnChange(e, i);
                            }}
                          />
                          <input
                            type="number"
                            placeholder="Harga"
                            name="price"
                            min={0}
                            required
                            className="border-gray-200 rounded w-full"
                            value={e.price ?? ""}
                            onChange={(e) => {
                              multipleInputOnChange(e, i);
                            }}
                          />
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            min={0}
                            placeholder="Jumlah Grosir"
                            name="wholesaleMin"
                            className="border-gray-200 rounded w-full"
                            value={e.wholesaleMin ?? ""}
                            onChange={(e) => {
                              multipleInputOnChange(e, i);
                            }}
                          />
                          <input
                            type="number"
                            placeholder="Harga Grosir"
                            name="wholesalePrice"
                            min={0}
                            className="border-gray-200 rounded w-full"
                            value={e.wholesalePrice ?? ""}
                            onChange={(e) => {
                              multipleInputOnChange(e, i);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="w-full">
              <button
                type="submit"
                className="bg-primary text-onPrimary py-2 px-4 rounded float-right"
              >
                Submit
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
      <Modal
        show={productDetail != null}
        onClose={() => {
          setProductDetail(null);
        }}
      >
        <Modal.Header>Produk Detail</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-2 max-h-[650px] overflow-scroll">
            <div className="bg-gray-700 h-52 w-full rounded shrink-0 md:h-72">
              <Carousel indicators={false}>
                <LazyLoadImage
                  src={productDetail?.picture}
                  alt={productDetail?.name}
                  className="object-contain h-full w-full"
                  onClick={() => {
                    setImage(productDetail?.picture);
                  }}
                />
                {productDetail?.productGalery?.map((e, i) => {
                  return (
                    <LazyLoadImage
                      key={i}
                      src={e.picture}
                      alt={productDetail?.name}
                      className="object-contain h-full w-full"
                      onClick={() => {
                        setImage(e.picture);
                      }}
                    />
                  );
                })}
              </Carousel>
            </div>
            <div className="bg-gray-100 p-2 rounded flex flex-col gap-2">
              <div>
                <div className="text-xs text-gray-400">Nama Produk</div>
                <div>{productDetail?.name}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Kategori</div>
                <div>{productDetail?.category?.name}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Deskripsi</div>
                <div className="max-h-40 overflow-scroll text-sm">
                  {productDetail?.description}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Harga</div>
                <div>{currency(productDetail?.price!)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Terjual</div>
                <div>{productDetail?.sell}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Dilihat</div>
                <div>{productDetail?.view}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Rating</div>
                <div>
                  <Rating>
                    {[...Array(5)].map((_, i) => (
                      <Rating.Star
                        key={i}
                        filled={Math.floor(productDetail?.rating!) > i}
                      />
                    ))}
                  </Rating>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Status Produk</div>
                <div>
                  {productDetail?.active ? (
                    <div className="text-green-500 border border-green-500 text-xs rounded px-1 w-fit">
                      AKTIF
                    </div>
                  ) : (
                    <div className="text-red-500 border border-red-500 text-xs rounded px-1 w-fit">
                      NON AKTIF
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Waktu Upload</div>
                <div>
                  {new Date(productDetail?.created!).toLocaleDateString(
                    "id-ID",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    }
                  )}
                </div>
              </div>
            </div>
            {productDetail?.productVariant?.map((e, i) => {
              return (
                <div key={i}>
                  <div>Varian Produk {i + 1}</div>
                  <div className="bg-gray-100 p-2 rounded flex flex-col gap-2">
                    <div>
                      <div className="text-xs text-gray-400">Nama Varian</div>
                      <div>{e.name}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Harga</div>
                      <div>{currency(e.price!)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">
                        Minimum Grosir
                      </div>
                      <div>{e.wholesaleMin}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Harga Grosir</div>
                      <div>{currency(e.wholesalePrice!)}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end w-full">
            {productDetail?.active ? (
              <button
                className="bg-red-500 p-2 text-white rounded flex gap-1 items-center"
                onClick={() => {
                  updateProduct({ id: productDetail?.id, active: false });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
                Non Aktifkan Produk
              </button>
            ) : (
              <button
                className="bg-green-500 p-2 text-white rounded flex gap-1 items-center"
                onClick={() => {
                  updateProduct({ id: productDetail?.id, active: true });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Aktifkan Produk
              </button>
            )}
          </div>
        </Modal.Footer>
      </Modal>
      <Modal
        dismissible
        show={image != null}
        onClose={() => {
          setImage(null);
        }}
      >
        <div className="relative">
          <button
            className="absolute right-2 top-2 bg-white drop-shadow rounded-full p-1"
            onClick={() => {
              setImage(null);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
          <img src={image!} className="w-full h-full" />
        </div>
      </Modal>
      <ModalLoading show={loading} />
    </>
  );
}
