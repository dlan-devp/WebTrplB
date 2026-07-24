<?php

namespace App\Filament\Resources\Jadwals;

use App\Filament\Resources\Jadwals\Pages\ManageJadwals;
use App\Models\Jadwal;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use UnitEnum;

class JadwalResource extends Resource
{
    protected static ?string $model = Jadwal::class;
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedClock;
    protected static ?string $recordTitleAttribute = 'Jadwal';
    protected static ?string $navigationLabel = 'Jadwal';
    protected static ?int $navigationSort = 2;
    protected static UnitEnum|string|null $navigationGroup = 'Manajemen Kelas';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('matkul')
                    ->required(),
                Select::make('hari')
                    ->required()
                    ->options([
                        'Senin' => 'Senin',
                        'Selasa' => 'Selasa',
                        'Rabu' => 'Rabu',
                        'kamis' => 'kamis',
                        'Jumat' => 'Jumat',

                    ]),
                TextInput::make('waktu')
                    ->required()
                    ->placeholder('ABC, DEF / 7:30 - 9:30...'),
                TextInput::make('dosen')
                    ->required(),
                TextInput::make('ruang')
                    ->required()
                    ->placeholder('Ruang-#'),
                Select::make('type')
                    ->required()
                    ->options([
                        'Teori' => 'Teori',
                        'Praktikum' => 'Praktikum'
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('matkul')
                    ->searchable(),
                TextColumn::make('hari')
                    ->searchable(),
                TextColumn::make('waktu')
                    ->searchable(),
                TextColumn::make('dosen')
                    ->searchable(),
                TextColumn::make('ruang')
                    ->searchable(),
                TextColumn::make('type')
                    ->searchable(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageJadwals::route('/'),
        ];
    }
}
