import type { NextPage } from "next";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

import Navbar from "@/components/navbar";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import { Loader2 } from "lucide-react";
import Footer from "@/components/footer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SummaryResponse {
  text: string;
}

const Home: NextPage = () => {
  const { toast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [generatedSummary, setGeneratedSummary] = useState<string>("");
  const [pdfText, setPdfText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [selectedIntensity, setSelectedIntensity] = useState<string>("");
  const summaryRef = useRef<HTMLDivElement | null>(null);

  const prompt = `Por favor resuma o seguinte texto com intensidade ${selectedIntensity} :
${pdfText}`;

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];
    if (!newFile) return;
    setFile(newFile);
    await handleExtractText(newFile);
  };

  const handleExtractText = async (pdfFile: File) => {
    if (!pdfFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(pdfFile);
    reader.onload = async () => {
      const base64 = reader.result?.toString().split(",")[1];
      if (!base64) return;
      const res = await fetch("/api/extract-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: base64 }),
      });

      if (res.ok) {
        const data: SummaryResponse = await res.json();
        console.log("Texto extraido:", data.text);
        setPdfText(data.text);
      } else {
        toast({
          title: "Erro ao converter seu PDF.",
          description: "Não foi possível converter seu PDF em texto.",
        });
        console.error("Falhou ao extrair o texto do PDF.");
      }
    };
  };

  const resetStates = () => {
    setLoading(false);
    setGeneratedSummary("");
    setPdfText("");
    setFile(null);
    setSelectedIntensity("");
    toast({
      title: "Limpado com successo.",
      description: "Selecione um novo PDF.",
    });
  };

  const summarizePDF = async (e: FormEvent) => {
    e.preventDefault();
    setGeneratedSummary("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedSummary((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  return (
    <div>
      <Head>
        <title>Resuma meu PDF</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <div className="relative isolate px-6 pt-4 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center items-center ">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Resuma meu PDF
            </h1>
          </div>

          <div className="mt-10 sm:mt-12">
            <div className="flex justify-center">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Resuma qualquer arquivo PDF</CardTitle>
                  <CardDescription>Com apenas alguns cliques</CardDescription>
                </CardHeader>

                <CardContent>
                  {!generatedSummary && !loading && (
                    <form>
                      <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="file">Arquivo PDF</Label>
                          <Input
                            id="file"
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => {
                              handleFileChange(e);
                            }}
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Nível de resumo</Label>
                          <Select
                            onValueChange={(value) =>
                              setSelectedIntensity(value)
                            }
                          >
                            <span className="sr-only">Nível de Entendimento</span>
                            <SelectTrigger aria-label="Understanding Level">
                              <SelectValue placeholder="Nível de Entendimento" />
                              <span className="sr-only">
                                Nível de Entendimento
                              </span>
                              <SelectContent position="popper">
                                <SelectItem value="entendimento basico">
                                  Entendimento Básico
                                </SelectItem>
                                <SelectItem value="entendimento profundo">
                                  Entendimento Profundo
                                </SelectItem>
                                <SelectItem value="entendimento completo">
                                  Entendimento Completo
                                </SelectItem>
                              </SelectContent>
                            </SelectTrigger>
                          </Select>
                        </div>
                      </div>
                    </form>
                  )}

                  {generatedSummary && (
                    <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                      <div
                        className="rounded-xl shadow-md p-4 transition cursor-copy border"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedSummary);
                        }}
                      >
                        <p>{generatedSummary}</p>
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="flex justify-between">
                  <Button variant="ghost" onClick={resetStates}>
                    Limpar
                  </Button>
                  {!loading && (
                    <Button
                      disabled={!pdfText || !selectedIntensity}
                      onClick={(e) => summarizePDF(e)}
                    >
                      Resumir
                    </Button>
                  )}
                  {loading && (
                    <Button disabled>
                      <Loader2 className="animate-spin h-5 w-5" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
