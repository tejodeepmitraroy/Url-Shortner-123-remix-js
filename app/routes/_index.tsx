import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
// import Background from "../components/Background";
import axios from "axios";
import CopyToClipboard from "react-copy-to-clipboard";
import { Button, Input } from "@nextui-org/react";
import Tables, { TablesProps } from "~/components/Tables";

export const meta: MetaFunction = () => {
  return [
    { title: "Url Shortner 123" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [inputValue, setInputValue] = useState<string>("");
  const [shortenLink, setShortenLink] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [analytics, setAnalytics] = useState<TablesProps[]>([]);

  const handleSubmit = async () => {
    console.log(inputValue);

    if (inputValue.length) {
      try {
        setisLoading(true);
        const { data } = await axios.post(`http://localhost:5173/api/url`, {
          url: inputValue,
        });

        // console.log(data);

        // console.log(window.location.href);
        setShortenLink(`${window.location.href}${data.shortId}`);
        fetchAnalytics();
        setisLoading(false);
      } catch (err) {
        // setError(true);
        setisLoading(false);
      }
    }
  };

  const fetchAnalytics = async () => {
    const { data } = await axios("http://localhost:5173/api/analytics");
    setAnalytics(data);
    console.log("ana", data);
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <section className="w-full mt-10 max-w-6xl flex  mx-auto">
      <section className="w-[40%] h-auto flex flex-col gap-7 p-4 pr-10">
        {/* <h1>UrlShortner 123</h1> */}
        <p className="text-lg font-semibold">
          Put your favorite Link🔗 and we convert🚀 your link into short link🖇️.
        </p>
        <section className="flex gap-6 flex-col items-center ">
          <Input
            type="string"
            label="Link"
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
            placeholder="Enter your favorite Link"
          />
          <Button
            onClick={handleSubmit}
            isLoading={isLoading}
            color="primary"
            className="w-full text-lg font-semibold"
            size="lg"
          >
            Get the Link 🚀
          </Button>
        </section>

        <div className=" w-full h-12  rounded-lg flex items-center justify-between">
          <div className="w-[80%] h-full border-2 border-[#f7c00ae8]  rounded-3xl  m-0">
            <p className="p-2">{shortenLink}</p>
          </div>
          <CopyToClipboard text={shortenLink} onCopy={() => setCopied(true)}>
            <Button
              className={`border-2 rounded-3xl p-2 ml-1 text-center bg-[#f7c00ae8] cursor-pointer font-bold ${
                copied ? "bg-white text-[#f7c00ae8]" : ""
              }`}
            >
              Copy 
            </Button>
          </CopyToClipboard>
        </div>
      </section>

      <section className="w-[60%] h-auto items-center gap-5 p-4  flex flex-col">
        <h2 className="text-4xl font-bold">Previous short Links</h2>
        <Tables analytics={analytics} />
      </section>
    </section>
  );
}
