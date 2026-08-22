<?php

namespace App\Filament\Widgets;

// use Filament\Actions\BulkActionGroup;
use App\Models\Testimoni;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Filament\Tables\Columns\TextColumn;
// use Filament\Widgets\TableWidget as BaseWidget;

class TableTestimoniWidget extends TableWidget
{
    protected static ?int $sort = 3;
    protected static ?string $heading = 'Testimoni Terbaru';

    // protected int | string | array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Testimoni::query()->latest()->limit(5)
            )
            ->columns([
                TextColumn::make('nama')
                    ->label('Nama'),
                TextColumn::make('type')
                    ->label('Jenis')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Pendapat' => 'info',
                        'Saran' => 'success',
                        'Kritik' => 'danger',
                        default => 'gray',
                    }),
                TextColumn::make('deskripsi')
                    ->label('Pesan')
                    ->limit(50),
                TextColumn::make('created_at')
                    ->label('Waktu')
                    ->since(),
            ])
            ->paginated(false);
    }
}
