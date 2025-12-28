import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

async function getStandings() {
    try {
        const { data, error } = await supabase
            .from("standings")
            .select("*")
            .order("position", { ascending: true });

        if (error) throw error;
        return data || [];
    } catch (e) {
        console.error("Failed to fetch standings:", e);
        return [];
    }
}

export default async function StandingsPage() {
    const standings = await getStandings();

    return (
        <div className="container mx-auto py-12 px-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">League Standings</CardTitle>
                </CardHeader>
                <CardContent>
                    {standings.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No standings data available yet. Please check back later.
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[80px]">Pos</TableHead>
                                    <TableHead>Team</TableHead>
                                    <TableHead className="text-center">P</TableHead>
                                    <TableHead className="text-center">W</TableHead>
                                    <TableHead className="text-center">D</TableHead>
                                    <TableHead className="text-center">L</TableHead>
                                    <TableHead className="text-center">GF</TableHead>
                                    <TableHead className="text-center">GA</TableHead>
                                    <TableHead className="text-center">GD</TableHead>
                                    <TableHead className="text-right font-bold">Pts</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {standings.map((team, index) => (
                                    <TableRow key={team.id || index} className={team.team_name === 'Hillside FC' ? 'bg-blue-50' : ''}>
                                        <TableCell className="font-medium">{team.position || index + 1}</TableCell>
                                        <TableCell className={`font-bold ${team.team_name === 'Hillside FC' ? 'text-primary' : ''}`}>
                                            {team.team_name}
                                        </TableCell>
                                        <TableCell className="text-center">{team.played}</TableCell>
                                        <TableCell className="text-center">{team.won}</TableCell>
                                        <TableCell className="text-center">{team.drawn}</TableCell>
                                        <TableCell className="text-center">{team.lost}</TableCell>
                                        <TableCell className="text-center">{team.goals_for}</TableCell>
                                        <TableCell className="text-center">{team.goals_against}</TableCell>
                                        <TableCell className="text-center">{team.goal_difference}</TableCell>
                                        <TableCell className="text-right font-bold text-lg">{team.points}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
