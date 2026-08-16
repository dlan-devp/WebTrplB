<?php

namespace App\Filament\Resources\KategoriGaleris;

use App\Filament\Resources\KategoriGaleris\Pages\ManageKategoriGaleris;
use App\Models\KategoriGaleri;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use UnitEnum;

class KategoriGaleriResource extends Resource
{
    protected static ?string $model = KategoriGaleri::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCircleStack;

    protected static ?string $recordTitleAttribute = 'KategoriGaleri';
    protected static ?string $navigationLabel = 'Kategori Galeri';
    protected static ?string $modelLabel = 'Kategori Galeri';
    protected static ?int $navigationSort = 4;
    protected static UnitEnum|string|null $navigationGroup = 'Manajemen Galeri';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('nama')
                    ->required()
                    ->maxLength(255),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('nama')
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
            'index' => ManageKategoriGaleris::route('/'),
        ];
    }
}
