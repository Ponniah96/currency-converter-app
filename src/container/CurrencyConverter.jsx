import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Paper,
  Divider,
  Link,
  Stack,
  Box,
  Typography,
  Autocomplete,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Skeleton,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Speech from "react-speech";

export function CurrencyConverter() {
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(1);
  const [fromCountry, setFromCountry] = useState(currencyCountries[145]);
  const [toCountry, setToCountry] = useState(currencyCountries[63]);
  const [toAmountChanges, setToAmountChanges] = useState(false);
  const [displayData, setDisplayData] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (
      fromAmount !== undefined &&
      fromCountry !== null &&
      toAmount !== undefined &&
      toCountry !== null
    ) {
      if (fromAmount > 0 && toAmount > 0) {
        getData();
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [fromAmount, toAmount, fromCountry, toCountry]);

  async function getData() {
    const amount = toAmountChanges ? toAmount : fromAmount;
    const inputCountry = toAmountChanges ? toCountry : fromCountry;
    const outputCountry = toAmountChanges ? fromCountry : toCountry;

    await axios
      .get(
        `https://v6.exchangerate-api.com/v6/45dc38f604864f361ecc655e/pair/${inputCountry.CurrencyCode}/${outputCountry.CurrencyCode}/${amount}`
      )
      .then((response) => {
        if (response.data.conversion_result !== undefined) {
          if (toAmountChanges) {
            setFromAmount(response.data.conversion_result);
            setToAmountChanges(false);
            setDisplayData(
              `Currency Conversion of ${inputCountry.Country} ${inputCountry.CurrencyCode} ${amount} ${inputCountry.CurrencyName} into ${outputCountry.Country} ${outputCountry.CurrencyCode} is ${response.data.conversion_result} ${outputCountry.CurrencyName}`
            );
          } else {
            setToAmount(response.data.conversion_result);
            setDisplayData(
              `Currency Conversion of ${inputCountry.Country} ${inputCountry.CurrencyCode} ${amount} ${inputCountry.CurrencyName} into ${outputCountry.Country} ${outputCountry.CurrencyCode} is ${response.data.conversion_result} ${outputCountry.CurrencyName}`
            );
          }
        }
      });
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper square={false} sx={{ p: 2 }} elevation={5}>
        <Typography variant="h5" gutterBottom textAlign={"center"}>
          {loading ? (
            <Skeleton sx={{ margin: "0 auto", width: "300px" }} />
          ) : (
            "Welcome to Currency Converter App!!"
          )}
        </Typography>

        <Divider sx={{ m: 2 }} />

        <Stack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{ m: 2, justifyContent: "center" }}
        >
          {loading ? (
            <Skeleton variant="rounded" height="50px" width="300px" />
          ) : (
            <TextField
              id="from-country"
              label="Enter amount"
              type="number"
              variant="standard"
              value={fromAmount}
              error={fromAmount.length === 0}
              onChange={(e) => {
                setFromAmount(e.target.value);
              }}
            />
          )}
          {loading ? (
            <Skeleton variant="rounded" height="50px" width="300px" />
          ) : (
            <Autocomplete
              id="from-country"
              sx={{ width: 300 }}
              options={currencyCountries}
              value={fromCountry}
              onChange={(e, value) => {
                setFromCountry(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Country"
                  variant="standard"
                  error={fromCountry === null}
                />
              )}
            />
          )}
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{ m: 2, justifyContent: "center" }}
        >
          {loading ? (
            <Skeleton variant="rounded" height="50px" width="300px" />
          ) : (
            <TextField
              id="to-country"
              label="Enter amount"
              type="number"
              variant="standard"
              value={toAmount}
              error={toAmount.length === 0}
              onChange={(e) => {
                setToAmountChanges(true);
                setToAmount(e.target.value);
              }}
            />
          )}
          {loading ? (
            <Skeleton variant="rounded" height="50px" width="300px" />
          ) : (
            <Autocomplete
              id="to-country"
              options={currencyCountries}
              sx={{ width: 300 }}
              value={toCountry}
              onChange={(e, value) => {
                setToCountry(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Country"
                  variant="standard"
                  error={toCountry === null}
                />
              )}
            />
          )}
        </Stack>

        <Accordion defaultExpanded sx={{ m: 2 }}>
          <AccordionSummary
            expandIcon={
              loading ? (
                <Skeleton variant="circular" width={40} height={40} />
              ) : (
                <ArrowDownwardIcon />
              )
            }
            aria-controls="requiredTechstacks"
            id="requiredTechstacks"
          >
            <Typography>
              {loading ? <Skeleton width="250px" /> : "Result"}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {loading ? (
              <Skeleton width="100%" />
            ) : (
              <Typography component="div">
                {displayData}
                <Speech
                  text={displayData}
                  displayText="Play Audio"
                  textAsButton={true}
                />
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ m: 2 }}>
          <AccordionSummary
            expandIcon={
              loading ? (
                <Skeleton variant="circular" width={40} height={40} />
              ) : (
                <ArrowDownwardIcon />
              )
            }
            aria-controls="requiredTechstacks"
            id="requiredTechstacks"
          >
            <Typography>
              {loading ? (
                <Skeleton width="250px" />
              ) : (
                "Techstacks to build this app"
              )}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="div">
              <Link
                href="https://react.dev/learn"
                underline="hover"
                target="_blank"
              >
                React
              </Link>
            </Typography>
            <Typography component="div">
              <Link href="https://mui.com/" underline="hover" target="_blank">
                Material UI
              </Link>
            </Typography>
            <Typography component="div">
              <Link
                href="https://axios-http.com/docs/intro"
                underline="hover"
                target="_blank"
              >
                Axios
              </Link>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ m: 2 }}>
          <AccordionSummary
            expandIcon={
              loading ? (
                <Skeleton variant="circular" width={40} height={40} />
              ) : (
                <ArrowDownwardIcon />
              )
            }
            aria-controls="codebaseInfo"
            id="codebaseInfo"
          >
            <Typography>
              {loading ? <Skeleton width="250px" /> : "Codebase and other info"}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="div">
              <Link
                href="https://github.com/Ponniah96/currency-converter-app"
                underline="hover"
                target="_blank"
              >
                GitHub
              </Link>
            </Typography>
            <Typography component="div">
              <Link
                href="https://app.exchangerate-api.com/dashboard"
                underline="hover"
                target="_blank"
              >
                Currency Converter API
              </Link>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Box>
  );
}

const currencyCountries = [
  {
    label: "AED - United Arab Emirates",
    CurrencyCode: "AED",
    Country: "United Arab Emirates",
    CurrencyName: "UAE Dirham",
  },
  {
    label: "AFN - Afghanistan",
    CurrencyCode: "AFN",
    Country: "Afghanistan",
    CurrencyName: "Afghan Afghani",
  },
  {
    label: "ALL - Albania",
    CurrencyCode: "ALL",
    Country: "Albania",
    CurrencyName: "Albanian Lek",
  },
  {
    label: "AMD - Armenia",
    CurrencyCode: "AMD",
    Country: "Armenia",
    CurrencyName: "Armenian Dram",
  },
  {
    label: "ANG - Netherlands Antilles",
    CurrencyCode: "ANG",
    Country: "Netherlands Antilles",
    CurrencyName: "Netherlands Antillian Guilder",
  },
  {
    label: "AOA - Angola",
    CurrencyCode: "AOA",
    Country: "Angola",
    CurrencyName: "Angolan Kwanza",
  },
  {
    label: "ARS - Argentina",
    CurrencyCode: "ARS",
    Country: "Argentina",
    CurrencyName: "Argentine Peso",
  },
  {
    label: "AUD - Australia",
    CurrencyCode: "AUD",
    Country: "Australia",
    CurrencyName: "Australian Dollar",
  },
  {
    label: "AWG - Aruba",
    CurrencyCode: "AWG",
    Country: "Aruba",
    CurrencyName: "Aruban Florin",
  },
  {
    label: "AZN - Azerbaijan",
    CurrencyCode: "AZN",
    Country: "Azerbaijan",
    CurrencyName: "Azerbaijani Manat",
  },
  {
    label: "BAM - Bosnia and Herzegovina",
    CurrencyCode: "BAM",
    Country: "Bosnia and Herzegovina",
    CurrencyName: "Bosnia and Herzegovina Mark",
  },
  {
    label: "BBD - Barbados",
    CurrencyCode: "BBD",
    Country: "Barbados",
    CurrencyName: "Barbados Dollar",
  },
  {
    label: "BDT - Bangladesh",
    CurrencyCode: "BDT",
    Country: "Bangladesh",
    CurrencyName: "Bangladeshi Taka",
  },
  {
    label: "BGN - Bulgaria",
    CurrencyCode: "BGN",
    Country: "Bulgaria",
    CurrencyName: "Bulgarian Lev",
  },
  {
    label: "BHD - Bahrain",
    CurrencyCode: "BHD",
    Country: "Bahrain",
    CurrencyName: "Bahraini Dinar",
  },
  {
    label: "BIF - Burundi",
    CurrencyCode: "BIF",
    Country: "Burundi",
    CurrencyName: "Burundian Franc",
  },
  {
    label: "BMD - Bermuda",
    CurrencyCode: "BMD",
    Country: "Bermuda",
    CurrencyName: "Bermudian Dollar",
  },
  {
    label: "BND - Brunei",
    CurrencyCode: "BND",
    Country: "Brunei",
    CurrencyName: "Brunei Dollar",
  },
  {
    label: "BOB - Bolivia",
    CurrencyCode: "BOB",
    Country: "Bolivia",
    CurrencyName: "Bolivian Boliviano",
  },
  {
    label: "BRL - Brazil",
    CurrencyCode: "BRL",
    Country: "Brazil",
    CurrencyName: "Brazilian Real",
  },
  {
    label: "BSD - Bahamas",
    CurrencyCode: "BSD",
    Country: "Bahamas",
    CurrencyName: "Bahamian Dollar",
  },
  {
    label: "BTN - Bhutan",
    CurrencyCode: "BTN",
    Country: "Bhutan",
    CurrencyName: "Bhutanese Ngultrum",
  },
  {
    label: "BWP - Botswana",
    CurrencyCode: "BWP",
    Country: "Botswana",
    CurrencyName: "Botswana Pula",
  },
  {
    label: "BYN - Belarus",
    CurrencyCode: "BYN",
    Country: "Belarus",
    CurrencyName: "Belarusian Ruble",
  },
  {
    label: "BZD - Belize",
    CurrencyCode: "BZD",
    Country: "Belize",
    CurrencyName: "Belize Dollar",
  },
  {
    label: "CAD - Canada",
    CurrencyCode: "CAD",
    Country: "Canada",
    CurrencyName: "Canadian Dollar",
  },
  {
    label: "CDF - Democratic Republic of the Congo",
    CurrencyCode: "CDF",
    Country: "Democratic Republic of the Congo",
    CurrencyName: "Congolese Franc",
  },
  {
    label: "CHF - Switzerland",
    CurrencyCode: "CHF",
    Country: "Switzerland",
    CurrencyName: "Swiss Franc",
  },
  {
    label: "CLP - Chile",
    CurrencyCode: "CLP",
    Country: "Chile",
    CurrencyName: "Chilean Peso",
  },
  {
    label: "CNY - China",
    CurrencyCode: "CNY",
    Country: "China",
    CurrencyName: "Chinese Renminbi",
  },
  {
    label: "COP - Colombia",
    CurrencyCode: "COP",
    Country: "Colombia",
    CurrencyName: "Colombian Peso",
  },
  {
    label: "CRC - Costa Rica",
    CurrencyCode: "CRC",
    Country: "Costa Rica",
    CurrencyName: "Costa Rican Colon",
  },
  {
    label: "CUP - Cuba",
    CurrencyCode: "CUP",
    Country: "Cuba",
    CurrencyName: "Cuban Peso",
  },
  {
    label: "CVE - Cape Verde",
    CurrencyCode: "CVE",
    Country: "Cape Verde",
    CurrencyName: "Cape Verdean Escudo",
  },
  {
    label: "CZK - Czech Republic",
    CurrencyCode: "CZK",
    Country: "Czech Republic",
    CurrencyName: "Czech Koruna",
  },
  {
    label: "DJF - Djibouti",
    CurrencyCode: "DJF",
    Country: "Djibouti",
    CurrencyName: "Djiboutian Franc",
  },
  {
    label: "DKK - Denmark",
    CurrencyCode: "DKK",
    Country: "Denmark",
    CurrencyName: "Danish Krone",
  },
  {
    label: "DOP - Dominican Republic",
    CurrencyCode: "DOP",
    Country: "Dominican Republic",
    CurrencyName: "Dominican Peso",
  },
  {
    label: "DZD - Algeria",
    CurrencyCode: "DZD",
    Country: "Algeria",
    CurrencyName: "Algerian Dinar",
  },
  {
    label: "EGP - Egypt",
    CurrencyCode: "EGP",
    Country: "Egypt",
    CurrencyName: "Egyptian Pound",
  },
  {
    label: "ERN - Eritrea",
    CurrencyCode: "ERN",
    Country: "Eritrea",
    CurrencyName: "Eritrean Nakfa",
  },
  {
    label: "ETB - Ethiopia",
    CurrencyCode: "ETB",
    Country: "Ethiopia",
    CurrencyName: "Ethiopian Birr",
  },
  {
    label: "EUR - European Union",
    CurrencyCode: "EUR",
    Country: "European Union",
    CurrencyName: "Euro",
  },
  {
    label: "FJD - Fiji",
    CurrencyCode: "FJD",
    Country: "Fiji",
    CurrencyName: "Fiji Dollar",
  },
  {
    label: "FKP - Falkland Islands",
    CurrencyCode: "FKP",
    Country: "Falkland Islands",
    CurrencyName: "Falkland Islands Pound",
  },
  {
    label: "FOK - Faroe Islands",
    CurrencyCode: "FOK",
    Country: "Faroe Islands",
    CurrencyName: "Faroese Króna",
  },
  {
    label: "GBP - United Kingdom",
    CurrencyCode: "GBP",
    Country: "United Kingdom",
    CurrencyName: "Pound Sterling",
  },
  {
    label: "GEL - Georgia",
    CurrencyCode: "GEL",
    Country: "Georgia",
    CurrencyName: "Georgian Lari",
  },
  {
    label: "GGP - Guernsey",
    CurrencyCode: "GGP",
    Country: "Guernsey",
    CurrencyName: "Guernsey Pound",
  },
  {
    label: "GHS - Ghana",
    CurrencyCode: "GHS",
    Country: "Ghana",
    CurrencyName: "Ghanaian Cedi",
  },
  {
    label: "GIP - Gibraltar",
    CurrencyCode: "GIP",
    Country: "Gibraltar",
    CurrencyName: "Gibraltar Pound",
  },
  {
    label: "GMD - The Gambia",
    CurrencyCode: "GMD",
    Country: "The Gambia",
    CurrencyName: "Gambian Dalasi",
  },
  {
    label: "GNF - Guinea",
    CurrencyCode: "GNF",
    Country: "Guinea",
    CurrencyName: "Guinean Franc",
  },
  {
    label: "GTQ - Guatemala",
    CurrencyCode: "GTQ",
    Country: "Guatemala",
    CurrencyName: "Guatemalan Quetzal",
  },
  {
    label: "GYD - Guyana",
    CurrencyCode: "GYD",
    Country: "Guyana",
    CurrencyName: "Guyanese Dollar",
  },
  {
    label: "HKD - Hong Kong",
    CurrencyCode: "HKD",
    Country: "Hong Kong",
    CurrencyName: "Hong Kong Dollar",
  },
  {
    label: "HNL - Honduras",
    CurrencyCode: "HNL",
    Country: "Honduras",
    CurrencyName: "Honduran Lempira",
  },
  {
    label: "HRK - Croatia",
    CurrencyCode: "HRK",
    Country: "Croatia",
    CurrencyName: "Croatian Kuna",
  },
  {
    label: "HTG - Haiti",
    CurrencyCode: "HTG",
    Country: "Haiti",
    CurrencyName: "Haitian Gourde",
  },
  {
    label: "HUF - Hungary",
    CurrencyCode: "HUF",
    Country: "Hungary",
    CurrencyName: "Hungarian Forint",
  },
  {
    label: "IDR - Indonesia",
    CurrencyCode: "IDR",
    Country: "Indonesia",
    CurrencyName: "Indonesian Rupiah",
  },
  {
    label: "ILS - Israel",
    CurrencyCode: "ILS",
    Country: "Israel",
    CurrencyName: "Israeli New Shekel",
  },
  {
    label: "IMP - Isle of Man",
    CurrencyCode: "IMP",
    Country: "Isle of Man",
    CurrencyName: "Manx Pound",
  },
  {
    label: "INR - India",
    CurrencyCode: "INR",
    Country: "India",
    CurrencyName: "Indian Rupee",
  },
  {
    label: "IQD - Iraq",
    CurrencyCode: "IQD",
    Country: "Iraq",
    CurrencyName: "Iraqi Dinar",
  },
  {
    label: "IRR - Iran",
    CurrencyCode: "IRR",
    Country: "Iran",
    CurrencyName: "Iranian Rial",
  },
  {
    label: "ISK - Iceland",
    CurrencyCode: "ISK",
    Country: "Iceland",
    CurrencyName: "Icelandic Króna",
  },
  {
    label: "JEP - Jersey",
    CurrencyCode: "JEP",
    Country: "Jersey",
    CurrencyName: "Jersey Pound",
  },
  {
    label: "JMD - Jamaica",
    CurrencyCode: "JMD",
    Country: "Jamaica",
    CurrencyName: "Jamaican Dollar",
  },
  {
    label: "JOD - Jordan",
    CurrencyCode: "JOD",
    Country: "Jordan",
    CurrencyName: "Jordanian Dinar",
  },
  {
    label: "JPY - Japan",
    CurrencyCode: "JPY",
    Country: "Japan",
    CurrencyName: "Japanese Yen",
  },
  {
    label: "KES - Kenya",
    CurrencyCode: "KES",
    Country: "Kenya",
    CurrencyName: "Kenyan Shilling",
  },
  {
    label: "KGS - Kyrgyzstan",
    CurrencyCode: "KGS",
    Country: "Kyrgyzstan",
    CurrencyName: "Kyrgyzstani Som",
  },
  {
    label: "KHR - Cambodia",
    CurrencyCode: "KHR",
    Country: "Cambodia",
    CurrencyName: "Cambodian Riel",
  },
  {
    label: "KID - Kiribati",
    CurrencyCode: "KID",
    Country: "Kiribati",
    CurrencyName: "Kiribati Dollar",
  },
  {
    label: "KMF - Comoros",
    CurrencyCode: "KMF",
    Country: "Comoros",
    CurrencyName: "Comorian Franc",
  },
  {
    label: "KRW - South Korea",
    CurrencyCode: "KRW",
    Country: "South Korea",
    CurrencyName: "South Korean Won",
  },
  {
    label: "KWD - Kuwait",
    CurrencyCode: "KWD",
    Country: "Kuwait",
    CurrencyName: "Kuwaiti Dinar",
  },
  {
    label: "KYD - Cayman Islands",
    CurrencyCode: "KYD",
    Country: "Cayman Islands",
    CurrencyName: "Cayman Islands Dollar",
  },
  {
    label: "KZT - Kazakhstan",
    CurrencyCode: "KZT",
    Country: "Kazakhstan",
    CurrencyName: "Kazakhstani Tenge",
  },
  {
    label: "LAK - Laos",
    CurrencyCode: "LAK",
    Country: "Laos",
    CurrencyName: "Lao Kip",
  },
  {
    label: "LBP - Lebanon",
    CurrencyCode: "LBP",
    Country: "Lebanon",
    CurrencyName: "Lebanese Pound",
  },
  {
    label: "LKR - Sri Lanka",
    CurrencyCode: "LKR",
    Country: "Sri Lanka",
    CurrencyName: "Sri Lanka Rupee",
  },
  {
    label: "LRD - Liberia",
    CurrencyCode: "LRD",
    Country: "Liberia",
    CurrencyName: "Liberian Dollar",
  },
  {
    label: "LSL - Lesotho",
    CurrencyCode: "LSL",
    Country: "Lesotho",
    CurrencyName: "Lesotho Loti",
  },
  {
    label: "LYD - Libya",
    CurrencyCode: "LYD",
    Country: "Libya",
    CurrencyName: "Libyan Dinar",
  },
  {
    label: "MAD - Morocco",
    CurrencyCode: "MAD",
    Country: "Morocco",
    CurrencyName: "Moroccan Dirham",
  },
  {
    label: "MDL - Moldova",
    CurrencyCode: "MDL",
    Country: "Moldova",
    CurrencyName: "Moldovan Leu",
  },
  {
    label: "MGA - Madagascar",
    CurrencyCode: "MGA",
    Country: "Madagascar",
    CurrencyName: "Malagasy Ariary",
  },
  {
    label: "MKD - North Macedonia",
    CurrencyCode: "MKD",
    Country: "North Macedonia",
    CurrencyName: "Macedonian Denar",
  },
  {
    label: "MMK - Myanmar",
    CurrencyCode: "MMK",
    Country: "Myanmar",
    CurrencyName: "Burmese Kyat",
  },
  {
    label: "MNT - Mongolia",
    CurrencyCode: "MNT",
    Country: "Mongolia",
    CurrencyName: "Mongolian Tögrög",
  },
  {
    label: "MOP - Macau",
    CurrencyCode: "MOP",
    Country: "Macau",
    CurrencyName: "Macanese Pataca",
  },
  {
    label: "MRU - Mauritania",
    CurrencyCode: "MRU",
    Country: "Mauritania",
    CurrencyName: "Mauritanian Ouguiya",
  },
  {
    label: "MUR - Mauritius",
    CurrencyCode: "MUR",
    Country: "Mauritius",
    CurrencyName: "Mauritian Rupee",
  },
  {
    label: "MVR - Maldives",
    CurrencyCode: "MVR",
    Country: "Maldives",
    CurrencyName: "Maldivian Rufiyaa",
  },
  {
    label: "MWK - Malawi",
    CurrencyCode: "MWK",
    Country: "Malawi",
    CurrencyName: "Malawian Kwacha",
  },
  {
    label: "MXN - Mexico",
    CurrencyCode: "MXN",
    Country: "Mexico",
    CurrencyName: "Mexican Peso",
  },
  {
    label: "MYR - Malaysia",
    CurrencyCode: "MYR",
    Country: "Malaysia",
    CurrencyName: "Malaysian Ringgit",
  },
  {
    label: "MZN - Mozambique",
    CurrencyCode: "MZN",
    Country: "Mozambique",
    CurrencyName: "Mozambican Metical",
  },
  {
    label: "NAD - Namibia",
    CurrencyCode: "NAD",
    Country: "Namibia",
    CurrencyName: "Namibian Dollar",
  },
  {
    label: "NGN - Nigeria",
    CurrencyCode: "NGN",
    Country: "Nigeria",
    CurrencyName: "Nigerian Naira",
  },
  {
    label: "NIO - Nicaragua",
    CurrencyCode: "NIO",
    Country: "Nicaragua",
    CurrencyName: "Nicaraguan Córdoba",
  },
  {
    label: "NOK - Norway",
    CurrencyCode: "NOK",
    Country: "Norway",
    CurrencyName: "Norwegian Krone",
  },
  {
    label: "NPR - Nepal",
    CurrencyCode: "NPR",
    Country: "Nepal",
    CurrencyName: "Nepalese Rupee",
  },
  {
    label: "NZD - New Zealand",
    CurrencyCode: "NZD",
    Country: "New Zealand",
    CurrencyName: "New Zealand Dollar",
  },
  {
    label: "OMR - Oman",
    CurrencyCode: "OMR",
    Country: "Oman",
    CurrencyName: "Omani Rial",
  },
  {
    label: "PAB - Panama",
    CurrencyCode: "PAB",
    Country: "Panama",
    CurrencyName: "Panamanian Balboa",
  },
  {
    label: "PEN - Peru",
    CurrencyCode: "PEN",
    Country: "Peru",
    CurrencyName: "Peruvian Sol",
  },
  {
    label: "PGK - Papua New Guinea",
    CurrencyCode: "PGK",
    Country: "Papua New Guinea",
    CurrencyName: "Papua New Guinean Kina",
  },
  {
    label: "PHP - Philippines",
    CurrencyCode: "PHP",
    Country: "Philippines",
    CurrencyName: "Philippine Peso",
  },
  {
    label: "PKR - Pakistan",
    CurrencyCode: "PKR",
    Country: "Pakistan",
    CurrencyName: "Pakistani Rupee",
  },
  {
    label: "PLN - Poland",
    CurrencyCode: "PLN",
    Country: "Poland",
    CurrencyName: "Polish Złoty",
  },
  {
    label: "PYG - Paraguay",
    CurrencyCode: "PYG",
    Country: "Paraguay",
    CurrencyName: "Paraguayan Guaraní",
  },
  {
    label: "QAR - Qatar",
    CurrencyCode: "QAR",
    Country: "Qatar",
    CurrencyName: "Qatari Riyal",
  },
  {
    label: "RON - Romania",
    CurrencyCode: "RON",
    Country: "Romania",
    CurrencyName: "Romanian Leu",
  },
  {
    label: "RSD - Serbia",
    CurrencyCode: "RSD",
    Country: "Serbia",
    CurrencyName: "Serbian Dinar",
  },
  {
    label: "RUB - Russia",
    CurrencyCode: "RUB",
    Country: "Russia",
    CurrencyName: "Russian Ruble",
  },
  {
    label: "RWF - Rwanda",
    CurrencyCode: "RWF",
    Country: "Rwanda",
    CurrencyName: "Rwandan Franc",
  },
  {
    label: "SAR - Saudi Arabia",
    CurrencyCode: "SAR",
    Country: "Saudi Arabia",
    CurrencyName: "Saudi Riyal",
  },
  {
    label: "SBD - Solomon Islands",
    CurrencyCode: "SBD",
    Country: "Solomon Islands",
    CurrencyName: "Solomon Islands Dollar",
  },
  {
    label: "SCR - Seychelles",
    CurrencyCode: "SCR",
    Country: "Seychelles",
    CurrencyName: "Seychellois Rupee",
  },
  {
    label: "SDG - Sudan",
    CurrencyCode: "SDG",
    Country: "Sudan",
    CurrencyName: "Sudanese Pound",
  },
  {
    label: "SEK - Sweden",
    CurrencyCode: "SEK",
    Country: "Sweden",
    CurrencyName: "Swedish Krona",
  },
  {
    label: "SGD - Singapore",
    CurrencyCode: "SGD",
    Country: "Singapore",
    CurrencyName: "Singapore Dollar",
  },
  {
    label: "SHP - Saint Helena",
    CurrencyCode: "SHP",
    Country: "Saint Helena",
    CurrencyName: "Saint Helena Pound",
  },
  {
    label: "SLE - Sierra Leone",
    CurrencyCode: "SLE",
    Country: "Sierra Leone",
    CurrencyName: "Sierra Leonean Leone",
  },
  {
    label: "SOS - Somalia",
    CurrencyCode: "SOS",
    Country: "Somalia",
    CurrencyName: "Somali Shilling",
  },
  {
    label: "SRD - Suriname",
    CurrencyCode: "SRD",
    Country: "Suriname",
    CurrencyName: "Surinamese Dollar",
  },
  {
    label: "SSP - South Sudan",
    CurrencyCode: "SSP",
    Country: "South Sudan",
    CurrencyName: "South Sudanese Pound",
  },
  {
    label: "STN - São Tomé and Príncipe",
    CurrencyCode: "STN",
    Country: "São Tomé and Príncipe",
    CurrencyName: "São Tomé and Príncipe Dobra",
  },
  {
    label: "SYP - Syria",
    CurrencyCode: "SYP",
    Country: "Syria",
    CurrencyName: "Syrian Pound",
  },
  {
    label: "SZL - Eswatini",
    CurrencyCode: "SZL",
    Country: "Eswatini",
    CurrencyName: "Eswatini Lilangeni",
  },
  {
    label: "THB - Thailand",
    CurrencyCode: "THB",
    Country: "Thailand",
    CurrencyName: "Thai Baht",
  },
  {
    label: "TJS - Tajikistan",
    CurrencyCode: "TJS",
    Country: "Tajikistan",
    CurrencyName: "Tajikistani Somoni",
  },
  {
    label: "TMT - Turkmenistan",
    CurrencyCode: "TMT",
    Country: "Turkmenistan",
    CurrencyName: "Turkmenistan Manat",
  },
  {
    label: "TND - Tunisia",
    CurrencyCode: "TND",
    Country: "Tunisia",
    CurrencyName: "Tunisian Dinar",
  },
  {
    label: "TOP - Tonga",
    CurrencyCode: "TOP",
    Country: "Tonga",
    CurrencyName: "Tongan Paʻanga",
  },
  {
    label: "TRY - Turkey",
    CurrencyCode: "TRY",
    Country: "Turkey",
    CurrencyName: "Turkish Lira",
  },
  {
    label: "TTD - Trinidad and Tobago",
    CurrencyCode: "TTD",
    Country: "Trinidad and Tobago",
    CurrencyName: "Trinidad and Tobago Dollar",
  },
  {
    label: "TVD - Tuvalu",
    CurrencyCode: "TVD",
    Country: "Tuvalu",
    CurrencyName: "Tuvaluan Dollar",
  },
  {
    label: "TWD - Taiwan",
    CurrencyCode: "TWD",
    Country: "Taiwan",
    CurrencyName: "New Taiwan Dollar",
  },
  {
    label: "TZS - Tanzania",
    CurrencyCode: "TZS",
    Country: "Tanzania",
    CurrencyName: "Tanzanian Shilling",
  },
  {
    label: "UAH - Ukraine",
    CurrencyCode: "UAH",
    Country: "Ukraine",
    CurrencyName: "Ukrainian Hryvnia",
  },
  {
    label: "UGX - Uganda",
    CurrencyCode: "UGX",
    Country: "Uganda",
    CurrencyName: "Ugandan Shilling",
  },
  {
    label: "USD - United States",
    CurrencyCode: "USD",
    Country: "United States",
    CurrencyName: "United States Dollar",
  },
  {
    label: "UYU - Uruguay",
    CurrencyCode: "UYU",
    Country: "Uruguay",
    CurrencyName: "Uruguayan Peso",
  },
  {
    label: "UZS - Uzbekistan",
    CurrencyCode: "UZS",
    Country: "Uzbekistan",
    CurrencyName: "Uzbekistani So'm",
  },
  {
    label: "VES - Venezuela",
    CurrencyCode: "VES",
    Country: "Venezuela",
    CurrencyName: "Venezuelan Bolívar Soberano",
  },
  {
    label: "VND - Vietnam",
    CurrencyCode: "VND",
    Country: "Vietnam",
    CurrencyName: "Vietnamese Đồng",
  },
  {
    label: "VUV - Vanuatu",
    CurrencyCode: "VUV",
    Country: "Vanuatu",
    CurrencyName: "Vanuatu Vatu",
  },
  {
    label: "WST - Samoa",
    CurrencyCode: "WST",
    Country: "Samoa",
    CurrencyName: "Samoan Tālā",
  },
  {
    label: "XAF - CEMAC",
    CurrencyCode: "XAF",
    Country: "CEMAC",
    CurrencyName: "Central African CFA Franc",
  },
  {
    label: "XCD - Organisation of Eastern Caribbean States",
    CurrencyCode: "XCD",
    Country: "Organisation of Eastern Caribbean States",
    CurrencyName: "East Caribbean Dollar",
  },
  {
    label: "XDR - International Monetary Fund",
    CurrencyCode: "XDR",
    Country: "International Monetary Fund",
    CurrencyName: "Special Drawing Rights",
  },
  {
    label: "XOF - CFA",
    CurrencyCode: "XOF",
    Country: "CFA",
    CurrencyName: "West African CFA franc",
  },
  {
    label: "XPF - Collectivités d'Outre-Mer",
    CurrencyCode: "XPF",
    Country: "Collectivités d'Outre-Mer",
    CurrencyName: "CFP Franc",
  },
  {
    label: "YER - Yemen",
    CurrencyCode: "YER",
    Country: "Yemen",
    CurrencyName: "Yemeni Rial",
  },
  {
    label: "ZAR - South Africa",
    CurrencyCode: "ZAR",
    Country: "South Africa",
    CurrencyName: "South African Rand",
  },
  {
    label: "ZMW - Zambia",
    CurrencyCode: "ZMW",
    Country: "Zambia",
    CurrencyName: "Zambian Kwacha",
  },
  {
    label: "ZWL - Zimbabwe",
    CurrencyCode: "ZWL",
    Country: "Zimbabwe",
    CurrencyName: "Zimbabwean Dollar",
  },
];
