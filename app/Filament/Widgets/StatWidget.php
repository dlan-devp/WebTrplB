<?php

namespace App\Filament\Widgets;

use App\Models\Galeri;
use App\Models\Mahasiswa;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatWidget extends StatsOverviewWidget
{
    protected static ?int $sort = 1;
    protected function getStats(): array
    {
        $mahasiswaBulanIni = Mahasiswa::whereMonth('created_at', now()->month)->count();
        $galeriBulanIni = Galeri::whereMonth('created_at', now()->month)->count();
        $userBulanIni = User::whereMonth('created_at', now()->month)->count();

        return [
            Stat::make('Total Mahasiswa', Mahasiswa::count())
                ->description($mahasiswaBulanIni > 0 ? "+{$mahasiswaBulanIni} bulan ini" : 'Belum ada penambahan')
                ->descriptionIcon($mahasiswaBulanIni > 0 ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-minus')
                ->chart($this->getWeeklyTrend(Mahasiswa::class))
                ->color('success')
                ->icon('heroicon-o-academic-cap'),

            Stat::make('Total Foto Galeri', Galeri::count())
                ->description($galeriBulanIni > 0 ? "+{$galeriBulanIni} bulan ini" : 'Belum ada penambahan')
                ->descriptionIcon($galeriBulanIni > 0 ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-minus')
                ->chart($this->getWeeklyTrend(Galeri::class))
                ->color('primary')
                ->icon('heroicon-o-photo'),

            Stat::make('Total User', User::count())
                ->description($userBulanIni > 0 ? "+{$userBulanIni} bulan ini" : 'Belum ada penambahan')
                ->descriptionIcon($userBulanIni > 0 ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-minus')
                ->chart($this->getWeeklyTrend(User::class))
                ->color('warning')
                ->icon('heroicon-o-users'),
        ];
    }

    private function getWeeklyTrend(string $model): array
    {
        return collect(range(6, 0))
            ->map(function ($daysAgo) use ($model) {
                return $model::whereDate('created_at', now()->subDays($daysAgo)->toDateString())->count();
            })
            ->toArray();
    }
}