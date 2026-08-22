<?php

namespace App\Filament\Widgets;

use App\Models\Galeri;
use Filament\Widgets\ChartWidget;

class PieWidget extends ChartWidget
{
    protected ?string $heading = 'Data Distribusi Galeri';
    protected static ?int $sort = 2;

    protected function getData(): array
    {
        $data = Galeri::with('kategori')
            ->get()
            ->groupBy(fn ($item) => $item->kategori?->nama ?? 'Lainnya')
            ->map->count();

        return [
            'datasets' => [
                [
                    'label' => 'Jumlah Foto',
                    'data' => $data->values()->toArray(),
                    'backgroundColor' => ['#7F77DD', '#1D9E75', '#D85A30', '#378ADD', '#BA7517'],
                ],
            ],
            'labels' => $data->keys()->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'pie';
    }
}
