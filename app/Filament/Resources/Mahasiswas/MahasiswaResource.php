<?php

namespace App\Filament\Resources\Mahasiswas;

use App\Filament\Resources\Mahasiswas\Pages\ManageMahasiswas;
use App\Models\Mahasiswa;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use UnitEnum;

class MahasiswaResource extends Resource
{
    protected static ?string $model = Mahasiswa::class;
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedAcademicCap;
    protected static ?string $recordTitleAttribute = 'Mahasiswa';
    protected static ?string $navigationLabel = 'Mahasiswa';
    protected static ?int $navigationSort = 1;
    protected static UnitEnum|string|null $navigationGroup = 'Manajemen Kelas';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('nama')
                    ->required(),
                TextInput::make('umur')
                    ->required()
                    ->numeric(),
                Textarea::make('hobi')
                    ->required()
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('nama')
                    ->searchable(),
                TextColumn::make('umur')
                    ->searchable(),
                TextColumn::make('fakultas')
                    ->searchable(),
                TextColumn::make('jurusan')
                    ->searchable(),
                TextColumn::make('prodi')
                    ->searchable(),
                TextColumn::make('hobi')
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
            'index' => ManageMahasiswas::route('/'),
        ];
    }
}
