import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
// import Background from "../components/Background";
import axios from "axios";
import CopyToClipboard from "react-copy-to-clipboard";
import { Button, Divider, Input } from "@nextui-org/react";
import Tables from "~/components/Tables";
import Footer from "~/components/Footer";

export const meta: MetaFunction = () => {
  return [
    { title: "Url Shortner 123" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [inputValue, setInputValue] = useState<string>("");
  const [shortenLink, setShortenLink] = useState<string>("dwadwadwadwa");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    console.log("click");
    if (inputValue.length) {
      try {
        setLoading(true);
        const { data } = await axios(
          `https://api.shrtco.de/v2/shorten?url=${inputValue}`
        );

        console.log(data.result.full_short_link);

        setShortenLink(data.result.full_short_link);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }
  };

  return (
    <section className="w-full mt-20 max-w-6xl flex mx-auto">
      <section className="w-1/2 h-auto flex flex-col gap-7 p-4 pr-10">
        <h1>UrlShortner 123</h1>
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
            // isLoading
            color="primary"
            className="w-full text-lg font-semibold"
            size="lg"
          >
            Get the Link 🚀
          </Button>
        </section>

        {/* {loading && <p className="noData">Loading....</p>}
            {error && <p className="noData">Something went Wrong :(</p>} */}

        <div className=" w-full  rounded-lg flex items-center justify-between">
          <div className="w-[80%] h-full border-2 border-[#f7c00ae8]  rounded-3xl  m-0">
            <p className="p-2" >
              {shortenLink}
            </p>
          </div>
          <CopyToClipboard text={shortenLink} onCopy={() => setCopied(true)}>
            <Button
              className={`border-2 rounded-3xl p-2 ml-1 text-center bg-[#f7c00ae8] cursor-pointer font-bold ${
                copied ? "bg-white text-[#f7c00ae8]" : ""
              }`}
            >
              Copy to clipboard
            </Button>
          </CopyToClipboard>
        </div>
      </section>

      <section className="w-1/2 h-auto items-center gap-8 p-4  flex flex-col">
        <h2 className="text-4xl font-bold">Previous short Links</h2>
        <Tables />
      </section>
    </section>
  );
}
