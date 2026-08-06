import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { EraStats } from "@/lib/wildfire-data";

export function EraSummaryTable({ eras }: { eras: EraStats[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Era</TableHead>
            <TableHead>Years</TableHead>
            <TableHead>Mega-fires</TableHead>
            <TableHead>Mega-fires/yr</TableHead>
            <TableHead>Mega acres/yr</TableHead>
            <TableHead>Avg. mega-fire size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {eras.map((era) => (
            <TableRow key={era.label}>
              <TableCell className="font-medium">{era.label}</TableCell>
              <TableCell>{era.yearCount}</TableCell>
              <TableCell>{era.megaFireCount}</TableCell>
              <TableCell>{era.megaFiresPerYear.toFixed(2)}</TableCell>
              <TableCell>{era.acresPerYear.toLocaleString()}</TableCell>
              <TableCell>{era.avgMegaFireSize.toLocaleString()} acres</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
