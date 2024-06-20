import { EventProps, FilterProps } from "@/types";

import * as XLSX from 'xlsx'

// For loading example data 
import { promises as fs } from 'fs';

export async function GET(
    request: NextRequest,
    { params }: { params: { table: string } }
) {

    // Check auth & permission here

    const searchParams = request.nextUrl.searchParams
    const format = searchParams.get('format')

    try {
        const { table } = params

        if (!table) throw new Error('Table name required')

        // Pseudo-code steps:
        // 1. GET all table names from db

        // 2. Find the table that matches the param

        // 3. If table name doesn't exist, throw error 

        // 4. If it does exist, use the matching table name 
        // for the proper case
        const tableName = "Todos"

        // 5. Query the table data from database
        // ** Using static data in this example

        // Loading example data 
        const file = await fs.readFile(process.cwd() + '/example-data/data.json', 'utf8');
        const jsonTableData = JSON.parse(file);

        console.log(jsonTableData)



        const worksheet = XLSX.utils.json_to_sheet(jsonTableData)

        if (format === 'csv') {

            const csv = XLSX.utils.sheet_to_csv(worksheet, {
                forceQuotes: true,
            })

            return new Response(csv, {
                status: 200,
                headers: {
                    'Content-Disposition': `attachment; filename="${tableName}.csv"`,
                    'Content-Type': 'text/csv',
                }
            })
        }
        else if (format === 'txt') { // tab-separated values

            const txt = XLSX.utils.sheet_to_txt(worksheet, {
                forceQuotes: true,
            })

            return new Response(txt, {
                status: 200,
                headers: {
                    'Content-Disposition': `attachment; filename="${tableName}.txt"`,
                    'Content-Type': 'text/csv',
                }
            })
        }
        else if (format === 'xlsx') {
            const workbook = XLSX.utils.book_new()

            XLSX.utils.book_append_sheet(workbook, worksheet, "MySheet")

            const buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

            return new Response(buf, {
                status: 200,
                headers: {
                    'Content-Disposition': `attachment; filename="${tableName}.xlsx"`,
                    'Content-Type': 'application/vnd.ms-excel',
                }
            })
        }
        else if (format === 'json') {
            return Response.json(jsonTableData)
        }
        else {

            const html = XLSX.utils.sheet_to_html(worksheet)

            return new Response(html, {
                status: 200,
                headers: {
                    'Content-Type': 'text/html',
                }
            })
        }
    } catch (e) {
        if (e instanceof Error) {
            console.error(e)
            return new Response(e.message, {
                status: 400,
            })
        }
    }

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set("event_type", value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  // Set the specified search parameter to the given value
  const newSearchParams = new URLSearchParams(window.location.search);

  // Delete the specified search parameter
  newSearchParams.delete(type.toLocaleLowerCase());

  // Construct the updated URL pathname with the deleted search parameter
  const newPathname = `${
    window.location.pathname
  }?${newSearchParams.toString()}`;

  return newPathname;
};

const api = process.env.API_HOST_PORT;
async function getEventByID(EventID: string) {
  const response = await fetch(`${api}/api/v1/public/events/${EventID}`, {
    method: "GET",
  });

  return response.json();
}

export async function EventID({ params }: any) {
  const events = await getEventByID(params.id);

  return events;
}

export async function getEvents(filters: FilterProps) {
  const { title, limit, event_type } = filters;
  const response = await fetch(`${api}/api/v1/public/events/`, {
    method: "GET",
  });

  var events = await response.json();

  if (event_type != undefined && event_type != "") {
    events = events.filter(
      (event) => event.type_name.toLowerCase() == event_type
    );
  }
  if (title != undefined && title != "") {
    events = events.filter((event) =>
      event.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  return events;
}
